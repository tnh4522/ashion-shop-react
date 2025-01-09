import {createContext, useState, useEffect, useContext} from 'react';
import useUserContext from "../hooks/useUserContext.jsx";
import useNotificationContext from "../hooks/useNotificationContext.jsx";
import API from "../service/service.jsx";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const {userData, logout} = useUserContext();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {openSuccessNotification, openErrorNotification} = useNotificationContext();

    const fetchCart = async () => {
        setLoading(true);
        try {
            if (userData) {
                // Người dùng đã đăng nhập: lấy giỏ hàng từ API
                const response = await API.get('/cart/detail/');
                setCart(response.data.items);
            } else {
                // Người dùng không đăng nhập: lấy giỏ hàng từ localStorage
                const storedCart = localStorage.getItem('cart');
                setCart(storedCart ? JSON.parse(storedCart) : []);
            }
            setError(null);
        } catch (err) {
            setError(err.response ? err.response.data : 'Error fetching cart');
            openErrorNotification('Failed to fetch cart.');
        } finally {
            setLoading(false);
        }
    };

    // Gọi fetchCart khi trạng thái đăng nhập thay đổi
    useEffect(() => {
        if (!userData) {
            fetchCart();
        }
    }, [userData]);

    const addToCart = async (product) => {
        setLoading(true);
        const id = product.id;
        const size = product.size;
        const color = product.color;
        const quantity = product.quantity;

        try {
            if (userData) {
                const response = await API.post('/cart/create/', {
                    product: id,
                    size,
                    color,
                    quantity,
                }, {
                    headers: {
                        'Authorization': `Bearer ${userData.access}`,
                    },
                });

                setCart((prevCart) => {
                    const existingProduct = prevCart.find(item => item.product === product.id);
                    if (existingProduct) {
                        return prevCart.map(item =>
                            item.product === product.id
                                ? {...item, quantity: item.quantity + quantity}
                                : item
                        );
                    } else {
                        return [...prevCart, response.data];
                    }
                });
                openSuccessNotification('Product added to cart!');
            } else {
                // Người dùng không đăng nhập: lưu trữ trong localStorage
                setCart((prevCart) => {
                    const existingProduct = prevCart.find(item => item.id === product.id);
                    if (existingProduct) {
                        return prevCart.map(item =>
                            item.id === product.id
                                ? {...item, quantity: item.quantity + quantity}
                                : item
                        );
                    } else {
                        return [...prevCart, {...product, quantity}];
                    }
                });
                openSuccessNotification('Product added to cart!');
            }
            setError(null);
        } catch (err) {
            setError(err.response ? err.response.data : 'Error adding to cart');
            openErrorNotification('Failed to add product to cart.');
        } finally {
            setLoading(false);
        }
    };

    // Hàm cập nhật số lượng hoặc thông tin sản phẩm trong giỏ hàng
    const updateCartItem = async (itemId, updatedData) => {
        setLoading(true);
        try {
            if (userData) {
                // Người dùng đã đăng nhập: gọi API để cập nhật giỏ hàng
                const response = await API.put(`/cart/items/${itemId}/`, updatedData);
                setCart((prevCart) =>
                    prevCart.map(item => (item.id === itemId ? response.data : item))
                );
                openSuccessNotification('Cart item updated!');
            } else {
                // Người dùng không đăng nhập: cập nhật localStorage
                setCart((prevCart) =>
                    prevCart.map(item =>
                        item.id === itemId
                            ? {...item, ...updatedData}
                            : item
                    )
                );
                openSuccessNotification('Cart item updated!');
            }
            setError(null);
        } catch (err) {
            setError(err.response ? err.response.data : 'Error updating cart item');
            openErrorNotification('Failed to update cart item.');
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (itemId) => {
        setLoading(true);
        try {
            if (userData) {
                // Người dùng đã đăng nhập: gọi API để xóa giỏ hàng
                await API.delete(`/cart/items/${itemId}/`);
                setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
                openSuccessNotification('Cart item removed!');
            } else {
                // Người dùng không đăng nhập: xóa khỏi localStorage
                setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
                openSuccessNotification('Cart item removed!');
            }
            setError(null);
        } catch (err) {
            setError(err.response ? err.response.data : 'Error removing cart item');
            openErrorNotification('Failed to remove cart item.');
        } finally {
            setLoading(false);
        }
    };

    // Hàm lưu giỏ hàng vào localStorage khi cart thay đổi và người dùng không đăng nhập
    useEffect(() => {
        if (!userData) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, userData]);

    // Tính tổng số lượng sản phẩm trong giỏ hàng
    const totalCart = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, updateCartItem, totalCart, loading, error}}>
            {children}
        </CartContext.Provider>
    );
};

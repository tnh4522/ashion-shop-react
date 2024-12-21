import {Link, useNavigate} from "react-router-dom";
import { Button, Empty, Typography, InputNumber, Popconfirm, message } from 'antd';
import { useEffect, useState } from "react";

function ShopCart() {
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem('cart')) || [];
    });
    const navigate = useNavigate();

    const [total, setTotal] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        calculateTotal();
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const renderCart = () => {
        if (cart.length === 0) {
            return (
                <tr>
                    <td colSpan="5">
                        <Empty
                            className="p-5"
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{
                                height: 60,
                            }}
                            description={
                                <Typography.Text>
                                    No products in the cart
                                </Typography.Text>
                            }
                        >
                            <Button type="primary" onClick={() => navigate('/shop')}>Continue Shopping</Button>
                        </Empty>
                    </td>
                </tr>
            )
        } else {
            return cart.map((p) => (
                <tr key={p.id} id={`cart-item-${p.id}`}>
                    <td className="cart__product__item">
                        <img src={p.image} alt={p.name} width="80" />
                        <div className="cart__product__item__title">
                            <h6>{p.name}</h6>
                            <div className="rating">
                                {Array.from({ length: 5 }, (v, i) => (
                                    <i key={i} className={`fa fa-star${i < p.rating ? '' : '-o'}`}></i>
                                ))}
                            </div>
                        </div>
                    </td>
                    <td className="cart__price">${p.price.toFixed(2)}</td>
                    <td className="cart__quantity">
                        <InputNumber
                            style={{ width: 60 }}
                            min={1}
                            max={100}
                            keyboard={true}
                            value={p.quantity}
                            size="small"
                            onChange={(value) => updateQuantity(p.id, value)}
                        />
                    </td>
                    <td className="cart__total">${(p.price * p.quantity).toFixed(2)}</td>
                    <td className="cart__close">
                        <Popconfirm
                            title="Are you sure you want to remove this item?"
                            onConfirm={() => removeProduct(p.id)}
                            okText="Yes"
                            cancelText="No"
                            okType="danger"
                        >
                            <span className="icon_close" style={{ cursor: 'pointer' }}></span>
                        </Popconfirm>
                    </td>
                </tr>
            ));
        }
    }

    const calculateTotal = () => {
        const calculatedTotal = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
        const calculatedTotalItems = cart.reduce((acc, p) => acc + p.quantity, 0);
        setTotal(calculatedTotal.toFixed(2));
        setTotalItems(calculatedTotalItems);
    }

    const removeProduct = (id) => {
        const newCart = cart.filter(p => p.id !== id);
        setCart(newCart);
        message.success('Product removed from the cart.');
    }

    const updateQuantity = (id, quantity) => {
        const newCart = cart.map(p => {
            if (p.id === id) {
                return { ...p, quantity };
            }
            return p;
        });
        setCart(newCart);
    }

    return (
        <div>
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link to="/" className="breadcrumb__item"><i className="fa fa-home"></i> Home</Link>
                                <span>Shopping cart</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="shop-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shop__cart__table">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {renderCart()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="cart__btn">
                                <Link to="/shop">Continue Shopping</Link>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            {/* You can add additional buttons or functionalities here */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="discount__content">
                                <h6>Discount codes</h6>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    // Implement discount code logic here
                                }}>
                                    <input type="text" placeholder="Enter your coupon code" />
                                    <button type="submit" className="site-btn">Apply</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4 offset-lg-2">
                            <div className="cart__total__procced">
                                <h6>Cart total</h6>
                                <ul>
                                    <li>Items <span>{totalItems}</span></li>
                                    <li>Total <span>$ {total}</span></li>
                                </ul>
                                <Link to="/check-out" className="primary-btn">Proceed to checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ShopCart;

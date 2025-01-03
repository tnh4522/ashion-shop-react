import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import provincesData from "../../constant/province.json";
import {getDistrictInformation, getWardInformation} from "../../constant/Helper.jsx";
import useUserContext from "../../hooks/useUserContext.jsx";
import useNotificationContext from "../../hooks/useNotificationContext.jsx";
import API from "../../service/service.jsx";

function CheckoutPage() {
    const {userData, logout} = useUserContext();
    const {openSuccessNotification, openErrorNotification} = useNotificationContext();
    const navigate = useNavigate();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const [total, setTotal] = useState(0);

    const [userInformation, setUserInformation] = useState({
        username: "",
        email: "",
        phone_number: "",
        first_name: "",
        last_name: "",
    });

    const [userAddress, setUserAddress] = useState({
        id: "",
        street_address: "",
        ward: "",
        district: "",
        province: "",
        country: "Viet Nam",
        postal_code: "",
    });


    const [orderData, setOrderData] = useState({
        subtotal_price: 0,
        shipping_cost: 0,
        discount_amount: 0,
        tax_amount: 0,
        total_price: 0,
        total_weight: 0,
        shipping_address: '',
        shipping_address_text: '',
        billing_address: '',
        shipping_method: 'NONE',
        payment_method: 'COD',
        note: '',
        items: [],
    });

    const [provinceName, setProvinceName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [wardName, setWardName] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const shippingMethods = [
        {value: 'NONE', label: 'Take away'},
        {value: 'STANDARD', label: 'Standard Shipping'},
        {value: 'EXPRESS', label: 'Express Shipping'},
    ];

    const paymentMethods = [
        {value: 'COD', label: 'Cash on Delivery'},
        {value: 'CREDIT_CARD', label: 'Credit Card'},
        {value: 'TRANSFER', label: 'Bank Transfer'},
    ];

    const renderCart = cart.map((product, index) => {
        return (
            <li key={index}>
                {product.quantity} - {product.name} <span>${(product.price * product.quantity).toFixed(2)}</span>
            </li>
        )
    });

    const calculateTotal = () => {
        let subtotal = 0;
        cart.forEach(p => {
            subtotal += p.price * p.quantity;
        });
        const tax = subtotal * 0.1;
        const shippingCost = orderData.shipping_method !== 'NONE' ? 10 : 0;
        const totalPrice = subtotal + tax + shippingCost - orderData.discount_amount;

        setTotal(totalPrice.toFixed(2));

        setOrderData(prev => ({
            ...prev,
            subtotal_price: formatPrice(subtotal),
            tax_amount: formatPrice(tax),
            shipping_cost: formatPrice(shippingCost),
            total_price: formatPrice(totalPrice),
            items: cart.map(item => ({
                product: item.id,
                quantity: item.quantity,
                price: formatPrice(item.price),
                total_price: formatPrice(item.price * item.quantity),
                size: item.size || '',
                color: item.color || '',
            }))
        }));
    }

    useEffect(() => {
        calculateTotal();
        if (userData) {
            setUserInformation(userData.user);
            const address = userData.user.address[0];
            setUserAddress(address);
            setOrderData(prev => ({
                ...prev,
                shipping_address_text: `${address.street_address}, ${address.ward}, ${address.district}, ${address.province}`,
                shipping_address: address.id,
                billing_address: address.id,
            }));

            const province = provincesData.data.find(
                item => item.ProvinceID === parseInt(address.province, 10)
            );
            setProvinceName(province ? province.ProvinceName : 'Unknown');

            if (address.province) {
                getDistrictInformation(address.province)
                    .then(districtsData => {
                        setDistricts(districtsData);
                        const district = districtsData.find(
                            item => item.DistrictID === parseInt(address.district, 10)
                        );
                        setDistrictName(district ? district.DistrictName : 'Unknown');

                        if (address.district) {
                            getWardInformation(address.district)
                                .then(wardsData => {
                                    setWards(wardsData);
                                    const ward = wardsData.find(
                                        item => item.WardCode === address.ward
                                    );
                                    setWardName(ward ? ward.WardName : 'Unknown');
                                })
                                .catch(err => {
                                    console.error('Error fetching wards:', err);
                                    setWards([]);
                                    setWardName('Unknown');
                                });
                        }
                    })
                    .catch(err => {
                        console.error('Error fetching districts:', err);
                        setDistricts([]);
                        setDistrictName('Unknown');
                    });
            }
        }
    }, [userData]);

    useEffect(() => {
        if (userAddress.province) {
            getDistrictInformation(userAddress.province)
                .then(districtsData => {
                    setDistricts(districtsData);
                    setDistrictName('');
                    setWards([]);
                    setWardName('');
                    setUserAddress(prev => ({...prev, district: '', ward: ''}));
                })
                .catch(err => {
                    console.error('Error fetching districts:', err);
                    setDistricts([]);
                });
        } else {
            setDistricts([]);
            setDistrictName('');
            setWards([]);
            setWardName('');
            setUserAddress(prev => ({...prev, district: '', ward: ''}));
        }
    }, [userAddress.province]);

    useEffect(() => {
        if (userAddress.district) {
            getWardInformation(userAddress.district)
                .then(wardsData => {
                    setWards(wardsData);
                    setWardName('');
                    setUserAddress(prev => ({...prev, ward: ''}));
                })
                .catch(err => {
                    console.error('Error fetching wards:', err);
                    setWards([]);
                });
        } else {
            setWards([]);
            setWardName('');
            setUserAddress(prev => ({...prev, ward: ''}));
        }
    }, [userAddress.district]);

    useEffect(() => {
        calculateTotal();
    }, [cart, orderData.shipping_method]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserInformation({...userInformation, [name]: value});

        setOrderData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
        setOrderData(prev => ({
            ...prev,
            payment_method: method
        }));
    };

    const handleShippingMethodChange = (e) => {
        const {value} = e.target;
        setOrderData(prev => ({
            ...prev,
            shipping_method: value
        }));
    }

    const handleAddressChange = (e) => {
        const {name, value} = e.target;
        setUserAddress({...userAddress, [name]: value});

        if (name === 'province') {
            const province = provincesData.data.find(
                item => item.ProvinceID === parseInt(value, 10)
            );
            setProvinceName(province ? province.ProvinceName : 'Unknown');
            setDistrictName('');
            setWardName('');
        } else if (name === 'district') {
            const district = districts.find(
                item => item.DistrictID === parseInt(value, 10)
            );
            setDistrictName(district ? district.DistrictName : 'Unknown');
            setWardName('');
        } else if (name === 'ward') {
            const ward = wards.find(
                item => item.WardCode === value
            );
            setWardName(ward ? ward.WardName : 'Unknown');
        }

        setOrderData(prev => ({
            ...prev,
            shipping_address_text: `${userAddress.street_address}, ${wardName}, ${districtName}, ${provinceName}`
        }));
    }

    const handleOrderSubmit = async (e) => {
        e.preventDefault();

        if (!userInformation.first_name || !userInformation.last_name || !userAddress.street_address || !userInformation.phone_number || !userInformation.email) {
            openErrorNotification('Vui lòng điền đầy đủ thông tin bắt buộc.');
            return;
        }

        try {
            const response = await API.post('orders/create/', orderData, {
                headers: {
                    'Authorization': `Bearer ${userData.access}`,
                },
            });

            if (response.status === 201) {
                localStorage.setItem('order', JSON.stringify(response.data));
                openSuccessNotification('Đơn hàng được tạo thành công');

                if (response.data.payment) {
                    window.location.href = `https://demo.vivapayments.com/web2?ref=${response.data.payment.orderCode}`;
                } else {
                    navigate('/orders');
                }

                localStorage.removeItem('cart');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                openErrorNotification("Truy cập không hợp lệ. Vui lòng đăng nhập lại.");
                logout();
                return;
            }
            openErrorNotification('Có lỗi xảy ra khi tạo đơn hàng.');
            console.error('Error creating order:', error);
        }
    };

    function formatPrice(amount) {
        const sanitizedAmount = String(amount).replace(/,/g, "").trim();
        const numericValue = parseFloat(sanitizedAmount);
        if (isNaN(numericValue)) {
            throw new Error("Invalid price amount");
        }
        return numericValue.toFixed(2);
    }

    return (
        <div>
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link to="/" className="breadcrumb__item"><i className="fa fa-home"></i> Home</Link>
                                <Link to="/cart" className="breadcrumb__item">Shopping cart</Link>
                                <span>Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="checkout spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h6 className="coupon__link">
                                <span className="icon_tag_alt"></span>
                                <a href="#">Have a coupon?</a> Click here to enter your code.
                            </h6>
                        </div>
                    </div>
                    <form onSubmit={handleOrderSubmit} className="checkout__form">
                        <div className="row">
                            {/* Thông tin giao hàng */}
                            <div className="col-lg-7">
                                <h5>Billing detail</h5>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__input">
                                            <p>First Name <span>*</span></p>
                                            <input
                                                type="text"
                                                value={userInformation.first_name}
                                                onChange={handleChange}
                                                name="first_name"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__input">
                                            <p>Last Name <span>*</span></p>
                                            <input
                                                type="text"
                                                value={userInformation.last_name}
                                                onChange={handleChange}
                                                name="last_name"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__select">
                                            <p>Province <span>*</span></p>
                                            <select
                                                name="province"
                                                value={userAddress.province}
                                                onChange={handleAddressChange}
                                                className="form-select"
                                                required
                                            >
                                                <option value="">Select Province</option>
                                                {provincesData.data.map((province) => (
                                                    <option key={province.ProvinceID} value={province.ProvinceID}>
                                                        {province.ProvinceName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__select">
                                            <p>District <span>*</span></p>
                                            <select
                                                name="district"
                                                value={userAddress.district}
                                                onChange={handleAddressChange}
                                                className="form-select"
                                                required
                                                disabled={!userAddress.province}
                                            >
                                                <option value="">Select District</option>
                                                {districts.map((district) => (
                                                    <option key={district.DistrictID} value={district.DistrictID}>
                                                        {district.DistrictName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__select">
                                            <p>Ward <span>*</span></p>
                                            <select
                                                name="ward"
                                                value={userAddress.ward}
                                                onChange={handleAddressChange}
                                                className="form-select"
                                                required
                                                disabled={!userAddress.district}
                                            >
                                                <option value="">Select Ward</option>
                                                {wards.map((ward) => (
                                                    <option key={ward.WardCode} value={ward.WardCode}>
                                                        {ward.WardName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    {/* Địa chỉ */}
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__input">
                                            <p>Address <span>*</span></p>
                                            <input
                                                type="text"
                                                placeholder="Street Address"
                                                value={userAddress.street_address}
                                                onChange={handleAddressChange}
                                                name="street_address"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__input">
                                            <p>Phone <span>*</span></p>
                                            <input
                                                type="text"
                                                value={userInformation.phone_number}
                                                onChange={handleChange}
                                                name="phone_number"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__input">
                                            <p>Email <span>*</span></p>
                                            <input
                                                type="email"
                                                value={userInformation.email}
                                                onChange={handleChange}
                                                name="email"
                                                required
                                            />
                                        </div>
                                    </div>
                                    {/* Ghi chú đơn hàng */}
                                    <div className="col-lg-12">
                                        <div className="checkout__form__input">
                                            <p>Oder notes <span>*</span></p>
                                            <input type="text" placeholder="Note about your order, e.g, special noe for delivery"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Thông tin đơn hàng */}
                            <div className="col-lg-5">
                                <div className="checkout__order">
                                    <h5>Your order</h5>
                                    <div className="checkout__order__product">
                                        <ul>
                                            <li>
                                                <span className="top__text">Product</span>
                                                <span className="top__text__right">Total</span>
                                            </li>
                                            {renderCart}
                                        </ul>
                                    </div>
                                    <div className="checkout__order__total">
                                        <ul>
                                            <li>Subtotal <span>${orderData.subtotal_price}</span></li>
                                            <li>Tax <span>${orderData.tax_amount}</span></li>
                                            <li>Shipping <span>${orderData.shipping_cost}</span></li>
                                            <li>Total <span>${orderData.total_price}</span></li>
                                        </ul>
                                    </div>
                                    <div className="row">
                                        {/* Chọn phương thức vận chuyển */}
                                        <div className="checkout__order__widget col-lg-6">
                                            <h6>Shipping Method</h6>
                                            {shippingMethods.map(method => (
                                                <label key={method.value} htmlFor={method.value}>
                                                    {method.label}
                                                    <input
                                                        type="radio"
                                                        id={method.value}
                                                        name="shipping_method"
                                                        value={method.value}
                                                        checked={orderData.shipping_method === method.value}
                                                        onChange={handleShippingMethodChange}
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            ))}
                                        </div>
                                        {/* Chọn phương thức thanh toán */}
                                        <div className="checkout__order__widget col-lg-6">
                                            <h6>Payment Method</h6>
                                            {paymentMethods.map(method => (
                                                <label key={method.value} htmlFor={method.value}>
                                                    {method.label}
                                                    <input
                                                        type="radio"
                                                        id={method.value}
                                                        name="payment_method"
                                                        value={method.value}
                                                        checked={orderData.payment_method === method.value}
                                                        onChange={() => handlePaymentMethodChange(method.value)}
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Nút đặt hàng */}
                                    <button type="submit" className="site-btn mt-3">Place Order</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default CheckoutPage;

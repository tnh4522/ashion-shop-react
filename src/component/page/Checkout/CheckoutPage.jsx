import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import provincesData from "../../constant/province.json";
import {getDistrictInformation, getWardInformation} from "../../constant/Helper.jsx";

function CheckoutPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const user = JSON.parse(localStorage.getItem('user')) || {};
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
        billing_address: '',
        shipping_method: 'NONE',
        payment_method: 'COD',
        note: '',
        items: [
            {
                product: '',
                quantity: 1,
                price: 0,
                total_price: 0,
                size: '',
                color: ''
            }
        ],
    });

    const [provinceName, setProvinceName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [wardName, setWardName] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");


    const renderCart = cart.map((product, index) => {
        return (
            <li key={index}>
                {product.quantity} - {product.name} <span>$ {product.price * product.quantity}</span>
            </li>
        )
    });

    const calculateTotal = () => {
        let total = 0;
        cart.forEach(p => {
            total += p.price * p.quantity;
        });
        total = parseFloat(total);
        setTotal(total.toFixed(2));
    }

    useEffect(() => {
        calculateTotal();
        if (user) {
            setUserInformation(user.user);
            const address = user.user.address[0];
            setUserAddress(address);

            const province = provincesData.data.find(
                item => item.ProvinceID === parseInt(address.province, 10)
            );
            setProvinceName(province ? province.ProvinceName : 'Unknown');

            getDistrictInformation(userAddress.province)
                .then(districts => {
                    const district = districts.find(
                        item => item.DistrictID === parseInt(address.district, 10)
                    );
                    setDistrictName(district ? district.DistrictName : 'Unknown');
                })
                .catch(err => {
                    console.error('Error fetching district:', err);
                    setDistrictName('Unknown');
                });

            getWardInformation(address.district)
                .then(wards => {
                    const ward = wards.find(
                        item => item.WardCode === userAddress.ward
                    );
                    setWardName(ward ? ward.WardName : 'Unknown');
                })
                .catch(err => {
                    console.error('Error fetching ward:', err);
                    setWardName('Unknown');
                });
        }
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserInformation({...userInformation, [name]: value});
    }

    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
    };

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
                            <h6 className="coupon__link"><span className="icon_tag_alt"></span> <a href="#">Have a
                                coupon?</a> Click here to enter your code.</h6>
                        </div>
                    </div>
                    <form action="#" className="checkout__form">
                        <div className="row">
                            <div className="col-lg-7">
                                <h5>Billing detail</h5>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__input">
                                            <p>First Name <span>*</span></p>
                                            <input type="text" value={userInformation.first_name}
                                                   onChange={handleChange} name="first_name"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__input">
                                            <p>Last Name <span>*</span></p>
                                            <input type="text" value={userInformation.last_name} onChange={handleChange}
                                                   name="last_name"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__input">
                                            <p>Province <span>*</span></p>
                                            <input type="text" value={provinceName} disabled/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__input">
                                            <p>District <span>*</span></p>
                                            <input type="text" value={districtName} disabled/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__input">
                                            <p>Ward <span>*</span></p>
                                            <input type="text" value={wardName} disabled/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__input">
                                            <p>Address <span>*</span></p>
                                            <input type="text" placeholder="Street Address"
                                                   value={userAddress.street_address} onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__input">
                                            <p>Phone <span>*</span></p>
                                            <input type="text" value={userInformation.phone_number}
                                                   onChange={handleChange} name="phone_number"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__input">
                                            <p>Email <span>*</span></p>
                                            <input type="text" value={userInformation.email} onChange={handleChange}
                                                   name="email"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="checkout__form__checkbox">
                                            <label htmlFor="note">
                                                Note about your order, e.g, special noe for delivery
                                                <input type="checkbox" id="note"/>
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="checkout__form__input">
                                            <p>Oder notes <span>*</span></p>
                                            <input type="text"
                                                   placeholder="Note about your order, e.g, special noe for delivery"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                            <li>Shipping <span>Free</span></li>
                                            <li>Total <span>$ {total}</span></li>
                                        </ul>
                                    </div>
                                    <div className="checkout__order__widget">
                                        <label htmlFor="transfer">
                                            Direct Bank Transfer
                                            <input
                                                type="checkbox"
                                                id="transfer"
                                                checked={selectedPaymentMethod === "transfer"}
                                                onChange={() => handlePaymentMethodChange("transfer")}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="credit-card">
                                            Credit Card
                                            <input
                                                type="checkbox"
                                                id="credit-card"
                                                checked={selectedPaymentMethod === "credit-card"}
                                                onChange={() => handlePaymentMethodChange("credit-card")}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="check-payment">
                                            Cheque payment
                                            <input
                                                type="checkbox"
                                                id="check-payment"
                                                checked={selectedPaymentMethod === "check-payment"}
                                                onChange={() => handlePaymentMethodChange("check-payment")}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="paypal">
                                            PayPal
                                            <input
                                                type="checkbox"
                                                id="paypal"
                                                checked={selectedPaymentMethod === "paypal"}
                                                onChange={() => handlePaymentMethodChange("paypal")}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <button type="submit" className="site-btn">Place oder</button>
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
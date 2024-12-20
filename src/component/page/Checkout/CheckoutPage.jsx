import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function CheckoutPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const [total, setTotal] = useState(0);
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
    }, []);

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
                                coupon?</a> Click
                                here to enter your code.</h6>
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
                                            <input type="text"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__input">
                                            <p>Last Name <span>*</span></p>
                                            <input type="text"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="checkout__form__input">
                                            <p>Country <span>*</span></p>
                                            <input type="text"/>
                                        </div>
                                        <div className="checkout__form__input">
                                            <p>Address <span>*</span></p>
                                            <input type="text" placeholder="Street Address"/>
                                            <input type="text" placeholder="Apartment. suite, unite ect ( optinal )"/>
                                        </div>
                                        <div className="checkout__form__input">
                                            <p>Town/City <span>*</span></p>
                                            <input type="text"/>
                                        </div>
                                        <div className="checkout__form__input">
                                            <p>Country/State <span>*</span></p>
                                            <input type="text"/>
                                        </div>
                                        <div className="checkout__form__input">
                                            <p>Postcode/Zip <span>*</span></p>
                                            <input type="text"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__input">
                                            <p>Phone <span>*</span></p>
                                            <input type="text"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="checkout__form__input">
                                            <p>Email <span>*</span></p>
                                            <input type="text"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="checkout__form__checkbox">
                                            <label htmlFor="acc">
                                                Create an acount?
                                                <input type="checkbox" id="acc"/>
                                                <span className="checkmark"></span>
                                            </label>
                                            <p>Create am acount by entering the information below. If you are a returing
                                                customer login at the <br/>top of the page</p>
                                        </div>
                                        <div className="checkout__form__input">
                                            <p>Account Password <span>*</span></p>
                                            <input type="text"/>
                                        </div>
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
                                            <li>Total <span>$ {total}</span></li>
                                        </ul>
                                    </div>
                                    <div className="checkout__order__widget">
                                        <label htmlFor="o-acc">
                                            Create an acount?
                                            <input type="checkbox" id="o-acc"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <p>Create am acount by entering the information below. If you are a returing
                                            customer
                                            login at the top of the page.</p>
                                        <label htmlFor="check-payment">
                                            Cheque payment
                                            <input type="checkbox" id="check-payment"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="paypal">
                                            PayPal
                                            <input type="checkbox" id="paypal"/>
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
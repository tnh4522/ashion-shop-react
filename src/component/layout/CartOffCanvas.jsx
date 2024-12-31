import Offcanvas from 'react-bootstrap/Offcanvas';
import useShowOffCanvasContext from "../hooks/useShowOffCanvasContext.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {InputNumber} from "antd";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function CartOffCanvas() {
    const navigator = useNavigate();
    const {loadCart, showCart, toggleShowCart} = useShowOffCanvasContext();
    const handleClose = () => {
        toggleShowCart(false);
    };

    const [data, setData] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            const parseData = JSON.parse(cart);
            setData(parseData);

            const total = parseData.map(item => item.price * item.quantity).reduce((a, b) => a + b, 0);
            setCartTotal(total);
        }


    }, [loadCart]);

    const renderCart = () => {
        return data.map((item, index) => {
            return (
                <tr key={index}>
                    <td className="cart__product__item">
                        <img src={item.image} alt="" width="70"/>
                        <div className="cart__product__item__title">
                            <h5>{item.name}</h5>
                            <div className="rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                        </div>
                    </td>
                    <td className="cart__price">${item.price}</td>
                    <td className="cart__quantity">
                        <InputNumber
                            style={{width: 60}}
                            min={1}
                            max={100}
                            keyboard={true}
                            defaultValue={item.quantity}
                            size="small"
                            disabled={true}
                        />
                    </td>
                    <td className="cart__total">${item.price * item.quantity}</td>
                    <td className="cart__close"><span className="icon_close"></span></td>
                </tr>
            );
        });
    }
    return (
        <>
            <Offcanvas show={showCart} onHide={handleClose} placement={"end"}
                       style={{width: '50%'}}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <div className="shop-cart-offcanvas-title">
                            <i className="fa-solid fa-cart-shopping"></i> Shopping Cart
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <section className="shop-cart-offcanvas spad">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="shop__cart__offcanvas">
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
                                    <div className="cart__btn__offcanvas">
                                        <a href="javascript:void(0)" onClick={handleClose}>Continue Shopping</a>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="cart__btn__offcanvas update__btn">
                                        <a href="javascript:void(0)" onClick={() => {navigator('/cart'); toggleShowCart(false)}}>View Cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="row cart-offcanvas-footer">
                                <div className="col-lg-4">
                                    <div className="discount__content__offcanvas">
                                        <h6>Discount codes</h6>
                                        <form action="#">
                                            <input type="text"
                                                   placeholder="Enter your coupon code"/>
                                            <button type="submit" className="site-btn">Apply
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 offset-lg-2">
                                    <div className="cart__total__procced__offcanvas">
                                        <h6>Cart total</h6>
                                        <ul>
                                            <li>Subtotal <span>$ {cartTotal}</span></li>
                                            <li>Total <span>$ {cartTotal}</span></li>
                                        </ul>
                                        <a href="javascript:void(0)" onClick={() => {navigator('/check-out'); toggleShowCart(false)}} className="primary-btn">Proceed to checkout</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default CartOffCanvas;
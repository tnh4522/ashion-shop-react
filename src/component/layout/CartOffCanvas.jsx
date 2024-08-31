import Offcanvas from 'react-bootstrap/Offcanvas';
import useShowOffCanvasContext from "../hooks/useShowOffCanvasContext.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {InputNumber} from "antd";

function CartOffCanvas() {
    const {showCart, toggleShowCart} = useShowOffCanvasContext();

    const handleClose = () => {
        toggleShowCart(false);
    };

    return (
        <>
            <Offcanvas show={showCart} onHide={handleClose} placement={"end"} style={{width: '50%'}}>
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
                                            <tr>
                                                <td className="cart__product__item">
                                                    <img src="/ashion-master/img/shop-cart/cp-1.jpg" alt=""/>
                                                    <div className="cart__product__item__title">
                                                        <h5>Chain bucket bag</h5>
                                                        <div className="rating">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="cart__price">$ 150.0</td>
                                                <td className="cart__quantity">
                                                    <InputNumber
                                                        style={{width: 60}}
                                                        min={1}
                                                        max={100} k
                                                        eyboard={true}
                                                        defaultValue={3}
                                                        size="small"
                                                    />
                                                </td>
                                                <td className="cart__total">$ 300.0</td>
                                                <td className="cart__close"><span className="icon_close"></span></td>
                                            </tr>
                                            <tr>
                                                <td className="cart__product__item">
                                                    <img src="/ashion-master/img/shop-cart/cp-2.jpg" alt=""/>
                                                    <div className="cart__product__item__title">
                                                        <h5>Zip-pockets pebbled tote briefcase</h5>
                                                        <div className="rating">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="cart__price">$ 170.0</td>
                                                <td className="cart__quantity">
                                                    <InputNumber
                                                        style={{width: 60}}
                                                        min={1}
                                                        max={100} k
                                                        eyboard={true}
                                                        defaultValue={3}
                                                        size="small"
                                                    />
                                                </td>
                                                <td className="cart__total">$ 170.0</td>
                                                <td className="cart__close"><span className="icon_close"></span></td>
                                            </tr>
                                            <tr>
                                                <td className="cart__product__item">
                                                    <img src="/ashion-master/img/shop-cart/cp-3.jpg" alt=""/>
                                                    <div className="cart__product__item__title">
                                                        <h5>Black jean</h5>
                                                        <div className="rating">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="cart__price">$ 85.0</td>
                                                <td className="cart__quantity">
                                                    <InputNumber
                                                        style={{width: 60}}
                                                        min={1}
                                                        max={100} k
                                                        eyboard={true}
                                                        defaultValue={3}
                                                        size="small"
                                                    />
                                                </td>
                                                <td className="cart__total">$ 170.0</td>
                                                <td className="cart__close"><span className="icon_close"></span></td>
                                            </tr>
                                            <tr>
                                                <td className="cart__product__item">
                                                    <img src="/ashion-master/img/shop-cart/cp-4.jpg" alt=""/>
                                                    <div className="cart__product__item__title">
                                                        <h5>Cotton Shirt</h5>
                                                        <div className="rating">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="cart__price">$ 55.0</td>
                                                <td className="cart__quantity">
                                                    <InputNumber
                                                        style={{width: 60}}
                                                        min={1}
                                                        max={100} k
                                                        eyboard={true}
                                                        defaultValue={3}
                                                        size="small"
                                                    />
                                                </td>
                                                <td className="cart__total">$ 110.0</td>
                                                <td className="cart__close"><span className="icon_close"></span></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="cart__btn__offcanvas">
                                        <a href="/shop">Continue Shopping</a>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="cart__btn__offcanvas update__btn">
                                        <a href=""><span className="icon_loading"></span> Update cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="row cart-offcanvas-footer">
                                <div className="col-lg-4">
                                    <div className="discount__content__offcanvas">
                                        <h6>Discount codes</h6>
                                        <form action="#">
                                            <input type="text" placeholder="Enter your coupon code"/>
                                            <button type="submit" className="site-btn">Apply</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 offset-lg-2">
                                    <div className="cart__total__procced__offcanvas">
                                        <h6>Cart total</h6>
                                        <ul>
                                            <li>Subtotal <span>$ 750.0</span></li>
                                            <li>Total <span>$ 750.0</span></li>
                                        </ul>
                                        <a href="/" className="primary-btn">Proceed to checkout</a>
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
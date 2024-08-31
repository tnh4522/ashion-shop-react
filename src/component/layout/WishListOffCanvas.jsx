import Offcanvas from 'react-bootstrap/Offcanvas';
import useShowOffCanvasContext from "../hooks/useShowOffCanvasContext.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {InputNumber} from "antd";
import React from "react";

function WishListOffCanvas() {
    const {showWishlist, toggleShowWishlist} = useShowOffCanvasContext();

    const handleClose = () => {
        toggleShowWishlist(false);
    };

    return (
        <>
            <Offcanvas show={showWishlist} onHide={handleClose} placement={"end"} style={{width: '40%'}}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <div className="wishlist-offcanvas-title">
                            <span className="icon_heart_alt"></span> Wish List
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <section className="wishlist-offcanvas">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="wishlist__offcanvas">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
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
                                                <td className="cart__price">$ 55.0</td>
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
                                                <td className="cart__price">$ 55.0</td>
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
                                                <td className="cart__price">$ 55.0</td>
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
                                                <td className="cart__close"><span className="icon_close"></span></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {/*<div className="row">*/}
                            {/*    <div className="col-lg-6 col-md-6 col-sm-6">*/}
                            {/*        <div className="cart__btn__offcanvas">*/}
                            {/*            <a href="/shop">Continue Shopping</a>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="col-lg-6 col-md-6 col-sm-6">*/}
                            {/*        <div className="cart__btn__offcanvas update__btn">*/}
                            {/*            <a href=""><span className="icon_loading"></span> Update cart</a>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </section>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default WishListOffCanvas;
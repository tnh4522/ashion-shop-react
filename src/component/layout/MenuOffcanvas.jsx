import {useEffect, useState} from 'react';
import useShowOffCanvasContext from "../hooks/useShowOffCanvasContext.jsx";

function MenuOffcanvas() {
    const { showMenu, toggleShowMenu } = useShowOffCanvasContext();

    const handleShow = () => {
        toggleShowMenu(false);
    };

    return (
        <>
            <div className={"offcanvas-menu-overlay" + (showMenu ? " active" : "")} onClick={handleShow}></div>
            <div className={"offcanvas-menu-wrapper" + (showMenu ? " active" : "")}>
                <div className="offcanvas__close" onClick={handleShow}>+</div>
                <ul className="offcanvas__widget">
                    <li><span className="icon_search search-switch"></span></li>
                    <li><a href="#"><span className="icon_heart_alt"></span>
                        <div className="tip">2</div>
                    </a></li>
                    <li><a href="#"><span className="icon_bag_alt"></span>
                        <div className="tip">2</div>
                    </a></li>
                </ul>
                <div className="offcanvas__logo">
                    <a href="/"><img src="/ashion-master/img/logo.png" alt=""/></a>
                </div>
                <nav className="mobile-menu">
                    <ul>
                        <li className="active"><a href="/">Home</a></li>
                        <li><a href="/shop">Women’s</a></li>
                        <li><a href="/shop">Men’s</a></li>
                        <li><a href="/shop">Shop</a></li>
                        <li><a href="/product">Product Details</a></li>
                        <li><a href="/cart">Shop Cart</a></li>
                        <li><a href="/check-out">Checkout</a></li>
                        <li><a href="/blog/1">Blog Details</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
                <div className="offcanvas__auth">
                    <a href="#">Login</a>
                    <a href="#">Register</a>
                </div>
            </div>
        </>
    );
}

export default MenuOffcanvas;
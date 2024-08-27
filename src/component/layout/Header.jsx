import React from 'react';
import {Link} from "react-router-dom";
import {Image} from 'cloudinary-react';

function Header() {
    return (
        <header className="header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-3 col-lg-2">
                        <div className="header__logo">
                            <Image cloudName="dhuckb4qt" publicId="My Brand/logo_as6ugx" crop="scale"/>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-7">
                        <nav className="header__menu">
                            <ul>
                                <li className="active"><Link to="/">Home</Link></li>
                                <li><Link to="/shop">Women’s</Link></li>
                                <li><Link to="/shop">Men’s</Link></li>
                                <li><Link to="shop">Shop</Link></li>
                                <li><Link to="/">Pages</Link>
                                    <ul className="dropdown">
                                        <li><Link to="/product">Product Details</Link></li>
                                        <li><Link to="/cart">Shop Cart</Link></li>
                                        <li><Link to="/check-out">Checkout</Link></li>
                                        <li><Link to="/blog/1">Blog Details</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/blog">Blog</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3">
                        <div className="header__right">
                            <div className="header__right__auth">
                                <a href="#">Login</a>
                                <a href="#">Register</a>
                            </div>
                            <ul className="header__right__widget">
                                <li><span className="icon_search search-switch"></span></li>
                                <li><a href="#"><span className="icon_heart_alt"></span>
                                    <div className="tip">2</div>
                                </a></li>
                                <li><a href="#"><span className="icon_bag_alt"></span>
                                    <div className="tip">2</div>
                                </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="canvas__open">
                    <i className="fa fa-bars"></i>
                </div>
            </div>
        </header>
    )
}

export default Header
import React, { useEffect } from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';
import {Link} from "react-router-dom";

function Banner() {
    const options = {
        loop: true,
        margin: 10,
        dots: true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 1200,
        autoHeight: false,
    };

    return (
        <section className="banner set-bg" style={{ backgroundImage: 'url(ashion-master/img/banner/banner-1.jpg)' }}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-7 col-lg-8 m-auto">
                        <OwlCarousel className="banner__slider owl-carousel" {...options}>
                            <div className="banner__item">
                                <div className="banner__text">
                                    <span>The Chloe Collection</span>
                                    <h1>The Project Jacket</h1>
                                    <Link to="/">Shop now</Link>
                                </div>
                            </div>
                            <div className="banner__item">
                                <div className="banner__text">
                                    <span>The Chloe Collection</span>
                                    <h1>The Project Jacket</h1>
                                    <Link to="/">Shop now</Link>
                                </div>
                            </div>
                            <div className="banner__item">
                                <div className="banner__text">
                                    <span>The Chloe Collection</span>
                                    <h1>The Project Jacket</h1>
                                    <Link to="/">Shop now</Link>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;

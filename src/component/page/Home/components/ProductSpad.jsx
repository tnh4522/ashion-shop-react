import React, {useState, useEffect} from 'react';
import mixitup from 'mixitup';
import Popup from "reactjs-popup";

function ProductSpad() {
    const [activeFilter, setActiveFilter] = useState('*');

    useEffect(() => {
        if (document.querySelector('.property__gallery')) {
            mixitup('.property__gallery');
        }
    }, []);

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };
    return (
        <section className="product spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4">
                        <div className="section-title">
                            <h4>New product</h4>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8">
                        <ul className="filter__controls">
                            <li className={activeFilter === '*' ? 'active' : ''}
                                onClick={() => handleFilterClick('*')} data-filter="*">All
                            </li>
                            <li className={activeFilter === '.women' ? 'active' : ''}
                                onClick={() => handleFilterClick('.women')} data-filter=".women">Women’s
                            </li>
                            <li className={activeFilter === '.men' ? 'active' : ''}
                                onClick={() => handleFilterClick('.men')} data-filter=".men">Men’s
                            </li>
                            <li className={activeFilter === '.kid' ? 'active' : ''}
                                onClick={() => handleFilterClick('.kid')} data-filter=".kid">Kid’s
                            </li>
                            <li className={activeFilter === '.accessories' ? 'active' : ''}
                                onClick={() => handleFilterClick('.accessories')} data-filter=".accessories">Accessories
                            </li>
                            <li className={activeFilter === '.cosmetic' ? 'active' : ''}
                                onClick={() => handleFilterClick('.cosmetic')} data-filter=".cosmetic">Cosmetics
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row property__gallery">
                    <div className="col-lg-3 col-md-4 col-sm-6 mix women">
                        <div className="product__item">
                            <div className="product__item__pic set-bg"
                                 style={{backgroundImage: "url(/ashion-master/img/product/product-1.jpg)"}}>
                                <div className="label new">New</div>
                                <ul className="product__hover">
                                    <Popup trigger={<li><a className="image-popup">
                                        <span className="arrow_expand"></span></a></li>}
                                           contentStyle={{width: 350, border: "none", borderRadius: 15}}
                                           modal>
                                        <div className="popup-image">
                                            <img src="/ashion-master/img/product/product-1.jpg" alt=""/>
                                        </div>
                                    </Popup>
                                    <li><a href="#"><span className="icon_heart_alt"></span></a></li>
                                    <li><a href="#"><span className="icon_bag_alt"></span></a></li>
                                </ul>
                            </div>
                            <div className="product__item__text">
                                <h6><a href="#">Buttons tweed blazer</a></h6>
                                <div className="rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <div className="product__price">$ 59.0</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 mix men">
                        <div className="product__item">
                            <div className="product__item__pic set-bg"
                                 style={{backgroundImage: "url(/ashion-master/img/product/product-2.jpg)"}}>
                                <ul className="product__hover">
                                    <Popup trigger={<li><a className="image-popup">
                                        <span className="arrow_expand"></span></a></li>}
                                           contentStyle={{width: 350, border: "none", borderRadius: 15}}
                                           modal>
                                        <div className="popup-image">
                                            <img src="/ashion-master/img/product/product-2.jpg" alt=""/>
                                        </div>
                                    </Popup>
                                    <li><a href="#"><span className="icon_heart_alt"></span></a></li>
                                    <li><a href="#"><span className="icon_bag_alt"></span></a></li>
                                </ul>
                            </div>
                            <div className="product__item__text">
                                <h6><a href="#">Flowy striped skirt</a></h6>
                                <div className="rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <div className="product__price">$ 49.0</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 mix accessories">
                        <div className="product__item">
                            <div className="product__item__pic set-bg"
                                 style={{backgroundImage: "url(/ashion-master/img/product/product-3.jpg)"}}>
                                <div className="label stockout">out of stock</div>
                                <ul className="product__hover">
                                    <Popup trigger={<li><a className="image-popup">
                                        <span className="arrow_expand"></span></a></li>}
                                           contentStyle={{width: 350, border: "none", borderRadius: 15}}
                                           modal>
                                        <div className="popup-image">
                                            <img src="/ashion-master/img/product/product-3.jpg" alt=""/>
                                        </div>
                                    </Popup>
                                    <li><a href="#"><span className="icon_heart_alt"></span></a></li>
                                    <li><a href="#"><span className="icon_bag_alt"></span></a></li>
                                </ul>
                            </div>
                            <div className="product__item__text">
                                <h6><a href="#">Cotton T-Shirt</a></h6>
                                <div className="rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <div className="product__price">$ 59.0</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 mix cosmetic">
                        <div className="product__item">
                            <div className="product__item__pic set-bg"
                                 style={{backgroundImage: "url(/ashion-master/img/product/product-4.jpg)"}}>
                                <ul className="product__hover">
                                    <li><a href="/ashion-master/img/product/product-4.jpg" className="image-popup"><span
                                        className="arrow_expand"></span></a></li>
                                    <li><a href="#"><span className="icon_heart_alt"></span></a></li>
                                    <li><a href="#"><span className="icon_bag_alt"></span></a></li>
                                </ul>
                            </div>
                            <div className="product__item__text">
                                <h6><a href="#">Slim striped pocket shirt</a></h6>
                                <div className="rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <div className="product__price">$ 59.0</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 mix kid">
                        <div className="product__item">
                            <div className="product__item__pic set-bg"
                                 style={{backgroundImage: "url(/ashion-master/img/product/product-5.jpg)"}}>
                                <ul className="product__hover">
                                    <li><a href="/ashion-master/img/product/product-5.jpg" className="image-popup"><span
                                        className="arrow_expand"></span></a></li>
                                    <li><a href="#"><span className="icon_heart_alt"></span></a></li>
                                    <li><a href="#"><span className="icon_bag_alt"></span></a></li>
                                </ul>
                            </div>
                            <div className="product__item__text">
                                <h6><a href="#">Fit micro corduroy shirt</a></h6>
                                <div className="rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <div className="product__price">$ 59.0</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 mix women men kid accessories cosmetic">
                        <div className="product__item sale">
                            <div className="product__item__pic set-bg"
                                 style={{backgroundImage: "url(/ashion-master/img/product/product-6.jpg)"}}>
                                <div className="label sale">Sale</div>
                                <ul className="product__hover">
                                    <li><a href="/ashion-master/img/product/product-6.jpg" className="image-popup"><span
                                        className="arrow_expand"></span></a></li>
                                    <li><a href="#"><span className="icon_heart_alt"></span></a></li>
                                    <li><a href="#"><span className="icon_bag_alt"></span></a></li>
                                </ul>
                            </div>
                            <div className="product__item__text">
                                <h6><a href="#">Tropical Kimono</a></h6>
                                <div className="rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <div className="product__price">$ 49.0 <span>$ 59.0</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 mix women men kid accessories cosmetic">
                        <div className="product__item">
                            <div className="product__item__pic set-bg"
                                 style={{backgroundImage: "url(/ashion-master/img/product/product-7.jpg)"}}>
                                <ul className="product__hover">
                                    <li><a href="/ashion-master/img/product/product-7.jpg" className="image-popup"><span
                                        className="arrow_expand"></span></a></li>
                                    <li><a href="#"><span className="icon_heart_alt"></span></a></li>
                                    <li><a href="#"><span className="icon_bag_alt"></span></a></li>
                                </ul>
                            </div>
                            <div className="product__item__text">
                                <h6><a href="#">Contrasting sunglasses</a></h6>
                                <div className="rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <div className="product__price">$ 59.0</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 mix women men kid accessories cosmetic">
                        <div className="product__item sale">
                            <div className="product__item__pic set-bg"
                                 style={{backgroundImage: "url(/ashion-master/img/product/product-8.jpg)"}}>
                                <div className="label">Sale</div>
                                <ul className="product__hover">
                                    <li><a href="/ashion-master/img/product/product-8.jpg" className="image-popup"><span
                                        className="arrow_expand"></span></a></li>
                                    <li><a href="#"><span className="icon_heart_alt"></span></a></li>
                                    <li><a href="#"><span className="icon_bag_alt"></span></a></li>
                                </ul>
                            </div>
                            <div className="product__item__text">
                                <h6><a href="#">Water resistant backpack</a></h6>
                                <div className="rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <div className="product__price">$ 49.0 <span>$ 59.0</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductSpad
import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function ProductDetail() {
    const [activeThumb, setActiveThumb] = useState("product-1");
    const { id } = useParams();
    const location = useLocation();
    const { product } = location.state || {};
    console.log(product);

    const handleThumbClick = (hash) => {
        setActiveThumb(hash);
    };

    if (!product) {
        return <div>Product not found. Please go back to the shop.</div>;
    }

    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link to="/" className="breadcrumb__item">
                                    <i className="fa fa-home"></i> Home
                                </Link>
                                <Link to="/shop" className="breadcrumb__item">
                                    Shop
                                </Link>
                                <span>{product.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Product Details */}
            <section className="product-details spad">
                <div className="container">
                    <div className="row">
                        {/* Left: Images */}
                        <div className="col-lg-6">
                            <div className="product__details__pic">
                                <div className="product__details__pic__left product__thumb nice-scroll">
                                    {/*{product.main_image.map((img, index) => (*/}
                                    {/*    <a*/}
                                    {/*        key={index}*/}
                                    {/*        className={`pt ${activeThumb === `product-${index + 1}` ? "active" : ""}`}*/}
                                    {/*        href={`#product-${index + 1}`}*/}
                                    {/*        onClick={() => handleThumbClick(`product-${index + 1}`)}*/}
                                    {/*    >*/}
                                    {/*        <img src={img.thumbUrl} alt={product.name} />*/}
                                    {/*    </a>*/}
                                    {/*))}*/}
                                </div>
                                <div className="product__details__slider__content">
                                    {/*<OwlCarousel*/}
                                    {/*    className="product__details__pic__slider"*/}
                                    {/*    loop={false}*/}
                                    {/*    margin={0}*/}
                                    {/*    items={1}*/}
                                    {/*    dots={false}*/}
                                    {/*    nav*/}
                                    {/*    navText={[*/}
                                    {/*        "<i class='arrow_carrot-left'></i>",*/}
                                    {/*        "<i class='arrow_carrot-right'></i>",*/}
                                    {/*    ]}*/}
                                    {/*    smartSpeed={1200}*/}
                                    {/*    autoHeight={false}*/}
                                    {/*    autoplay={false}*/}
                                    {/*    onTranslated={(event) => {*/}
                                    {/*        const indexNum = event.item.index + 1;*/}
                                    {/*        setActiveThumb(`product-${indexNum}`);*/}
                                    {/*    }}*/}
                                    {/*>*/}
                                    {/*    {product.images.map((img, index) => (*/}
                                    {/*        <img*/}
                                    {/*            key={index}*/}
                                    {/*            data-hash={`product-${index + 1}`}*/}
                                    {/*            className={`product__big__img ${activeThumb === `product-${index + 1}` ? "active" : ""}`}*/}
                                    {/*            src={img.url}*/}
                                    {/*            alt={product.name}*/}
                                    {/*        />*/}
                                    {/*    ))}*/}
                                    {/*</OwlCarousel>*/}
                                </div>
                            </div>
                        </div>
                        {/* Right: Details */}
                        <div className="col-lg-6">
                            <div className="product__details__text">
                                <h3>{product.name}</h3>
                                <div className="rating">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className={`fa fa-star${i < product.rating ? "" : "-o"}`}></i>
                                    ))}
                                    <span>({product.reviews} reviews)</span>
                                </div>
                                <div className="product__details__price">
                                    ${parseInt(product.price).toFixed(2)}
                                    {product.oldPrice && <span>${product.oldPrice.toFixed(2)}</span>}
                                </div>
                                <p>{product.description}</p>
                                <div className="product__details__button">
                                    <div className="quantity">
                                        <span>Quantity:</span>
                                        <div className="pro-qty">
                                            <input type="number" min="1" defaultValue="1" />
                                        </div>
                                    </div>
                                    <button className="cart-btn">
                                        <span className="icon_bag_alt"></span> Add to cart
                                    </button>
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <span className="icon_heart_alt"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span className="icon_adjust-horiz"></span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Related Products */}
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="related__title">
                                <h5>RELATED PRODUCTS</h5>
                            </div>
                        </div>
                        {/*{product.relatedProducts.map((related, index) => (*/}
                        {/*    <div key={index} className="col-lg-3 col-md-4 col-sm-6">*/}
                        {/*        <div className="product__item">*/}
                        {/*            <div*/}
                        {/*                className="product__item__pic set-bg"*/}
                        {/*                style={{ backgroundImage: `url(${related.imageUrl})` }}*/}
                        {/*            >*/}
                        {/*                {related.isNew && <div className="label new">New</div>}*/}
                        {/*                <ul className="product__hover">*/}
                        {/*                    <li>*/}
                        {/*                        <a href={related.imageUrl} className="image-popup">*/}
                        {/*                            <span className="arrow_expand"></span>*/}
                        {/*                        </a>*/}
                        {/*                    </li>*/}
                        {/*                    <li>*/}
                        {/*                        <a href="#">*/}
                        {/*                            <span className="icon_heart_alt"></span>*/}
                        {/*                        </a>*/}
                        {/*                    </li>*/}
                        {/*                    <li>*/}
                        {/*                        <a href="#">*/}
                        {/*                            <span className="icon_bag_alt"></span>*/}
                        {/*                        </a>*/}
                        {/*                    </li>*/}
                        {/*                </ul>*/}
                        {/*            </div>*/}
                        {/*            <div className="product__item__text">*/}
                        {/*                <h6>*/}
                        {/*                    <Link to={`/product/${related.id}`}>{related.name}</Link>*/}
                        {/*                </h6>*/}
                        {/*                <div className="rating">*/}
                        {/*                    {[...Array(5)].map((_, i) => (*/}
                        {/*                        <i key={i} className={`fa fa-star${i < related.rating ? "" : "-o"}`}></i>*/}
                        {/*                    ))}*/}
                        {/*                </div>*/}
                        {/*                <div className="product__price">${related.price.toFixed(2)}</div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*))}*/}
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProductDetail;

import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import API from "../../service/service.jsx";
import {Tabs, InputNumber} from "antd";
import {AppstoreOutlined} from "@ant-design/icons";
import useNotificationContext from "../../hooks/useNotificationContext.jsx";
import {CartContext} from "../../contexts/CartContext.jsx";

function ProductDetail() {
    const {id} = useParams();
    const navigator = useNavigate();
    const {openSuccessNotification, openErrorNotification} = useNotificationContext();
    const [activeThumb, setActiveThumb] = useState("");
    const [activeImage, setActiveImage] = useState("");

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [reviewsCount, setReviewsCount] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProduct = async () => {
            try {
                const response = await API.get(`product/detail/${id}`);
                const data = response.data;
                data.price = parseFloat(data.price);
                data.sale_price = parseFloat(data.sale_price);
                data.colors = data.colors.split(",");
                data.colors = data.colors.map((color) => color.toLowerCase());
                data.sizes = data.sizes.split(",");

                data.inStock = true;
                data.promotions = ["Free shipping"];

                setProduct(data);

                setActiveThumb(data.images[0]?.id || "");
                setActiveImage(data.images[0]?.image || "");

                setReviewsCount(data.reviewsCount || 138);
            } catch (error) {
                console.error("There was an error fetching the product:", error);
            }
        };

        fetchProduct();

        const mockRelated = [
            {
                id: 101,
                name: "Buttons tweed blazer",
                imgUrl: "img/product/related/rp-1.jpg",
                isNew: true,
                price: 59.0,
                rating: 5,
            },
            {
                id: 102,
                name: "Flowy striped skirt",
                imgUrl: "img/product/related/rp-2.jpg",
                isNew: false,
                price: 49.0,
                rating: 5,
            },
            {
                id: 103,
                name: "Cotton T-Shirt",
                imgUrl: "img/product/related/rp-3.jpg",
                isNew: false,
                price: 59.0,
                rating: 5,
            },
            {
                id: 104,
                name: "Slim striped pocket shirt",
                imgUrl: "img/product/related/rp-4.jpg",
                isNew: false,
                price: 59.0,
                rating: 5,
            },
        ];
        setRelatedProducts(mockRelated);
    }, [id]);

    const handleThumbClick = (image) => {
        setActiveThumb(image.id);
        setActiveImage(image.image);
    };

    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            openErrorNotification("Please select color and size");
            return;
        }

        const data = {
            id: product.id,
            name: product.name,
            price: product.price,
            sale_price: product.sale_price,
            image: product.images[0].image,
            color: selectedColor,
            size: selectedSize,
            quantity: quantity,
        }

        addToCart(data);
    };

    const handleBuyNow = () => {
        if (!selectedColor || !selectedSize) {
            openErrorNotification("Please select color and size");
            return;
        }

        const data = {
            id: product.id,
            name: product.name,
            price: product.price,
            sale_price: product.sale_price,
            image: product.images[0].image,
            color: selectedColor,
            size: selectedSize,
            quantity: quantity,
        }

        addToCart(data);
        navigator("/cart");
    }

    if (!product) {
        return <div id="preloder">
            <div className="loader"></div>
        </div>
    }

    const displayPrice = product.sale_price || product.price;
    const hasSalePrice = !!product.sale_price;

    const items = [
        {
            label: 'Description',
            key: 'description',
            icon: <i className="fa-solid fa-list"></i>,
            children: (
                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <h6>Description</h6>
                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed
                        quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret.
                        Neque porro lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam
                        voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia ipsu
                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla
                        consequat massa quis enim.</p>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                        dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                        nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                        quis, sem.</p>
                </div>
            ),
        },
        {
            label: 'Specification',
            key: 'specification',
            icon: <AppstoreOutlined/>,
            children: (
                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <h6>Description</h6>
                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed
                        quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret.
                        Neque porro lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam
                        voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia ipsu
                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla
                        consequat massa quis enim.</p>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                        dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                        nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                        quis, sem.</p>
                </div>
            ),
        },
        {
            label: 'Navigation Three - Submenu',
            key: 'SubMenu',
            icon: <i className="fa-regular fa-user"></i>,
            children: (
                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <h6>Description</h6>
                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed
                        quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret.
                        Neque porro lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam
                        voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia ipsu
                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla
                        consequat massa quis enim.</p>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                        dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                        nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                        quis, sem.</p>
                </div>
            ),
        },
    ];

    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-option py-2 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link to="/" className="breadcrumb__item">
                                    <i className="fa fa-home"></i> Home
                                </Link>
                                <Link
                                    onClick={() => window.history.back()}
                                    className="breadcrumb__item"
                                    to="#"
                                >
                                    Products
                                </Link>
                                <span>{product.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details */}
            <section className="product-details spad pt-4 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="product__details__pic d-flex">
                                {/* Thumbnail list */}
                                <div
                                    className="product__thumb d-flex flex-column mr-2"
                                    style={{width: "80px"}}
                                >
                                    {product.images.map((img) => (
                                        <a
                                            key={img.id}
                                            className={`mb-2 pt ${
                                                activeThumb === img.id ? "border border-primary" : ""
                                            }`}
                                            href={`#${img.id}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleThumbClick(img);
                                            }}
                                        >
                                            <img
                                                src={img.image}
                                                alt={img.alt_text || product.name}
                                                className="img-fluid"
                                            />
                                        </a>
                                    ))}
                                </div>
                                {/* Ảnh to */}
                                <div className="product__details__slider__content flex-grow-1">
                                    <div className="pt__item">
                                        <img
                                            src={activeImage}
                                            alt={product.name}
                                            className="img-fluid"
                                            style={{width: "100%", height: "100%"}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="product__details__text">
                                <h3>
                                    {product.name}{" "}
                                    <span>Brand: {product.brand}</span>
                                </h3>

                                {/* Giả sử rating luôn là 5 sao, hiển thị cứng cho giống mẫu */}
                                <div className="rating">
                                    {Array.from({length: 5}).map((_, i) => (
                                        <i key={i} className="fa fa-star"></i>
                                    ))}
                                    <span>( {reviewsCount} reviews )</span>
                                </div>

                                <div className="product__details__price">
                                    ${displayPrice.toFixed(1)}{" "}
                                    {hasSalePrice && (
                                        <span>${product.price.toFixed(1)}</span>
                                    )}
                                </div>

                                <p>{product.description}</p>

                                <div className="product__details__button">
                                    <div className="quantity">
                                        <span>Quantity:</span>
                                        <InputNumber
                                            className="pro-qty"
                                            min={1}
                                            max={99}
                                            defaultValue={quantity}
                                            onChange={(value) => setQuantity(value)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="cart-btn"
                                        onClick={handleAddToCart}
                                    >
                                        <i className="fa-solid fa-cart-shopping"></i> Add to cart
                                    </button>
                                    <ul>
                                        <li>
                                            <a onClick={handleBuyNow} href="javascript:void(0)">
                                                <span className="icon_bag_alt"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span className="icon_heart_alt"></span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {/* Widget: Availability, color, size, promotions */}
                                <div className="product__details__widget">
                                    <ul>
                                        <li>
                                            <span>Availability:</span>
                                            <div className="stock__checkbox">
                                                <label htmlFor="stockin">
                                                    In Stock
                                                    <input
                                                        type="checkbox"
                                                        id="stockin"
                                                        checked={product.inStock}
                                                        readOnly
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <span>Available color:</span>
                                            <div className="color__checkbox">
                                                {product.colors.map((color, idx) => (
                                                    <label key={idx} htmlFor={color}>
                                                        <input
                                                            type="radio"
                                                            name="color__radio"
                                                            id={color}
                                                            checked={selectedColor === color}
                                                            onChange={() => setSelectedColor(color)}
                                                        />
                                                        <span className={`checkmark ${color}-bg`}></span>
                                                    </label>
                                                ))}
                                            </div>
                                        </li>
                                        <li>
                                            <span>Available size:</span>
                                            <div className="size__btn">
                                                {product.sizes.map((sz) => (
                                                    <label
                                                        key={sz}
                                                        htmlFor={`${sz}-btn`}
                                                        className={selectedSize === sz ? "active" : ""}
                                                    >
                                                        <input
                                                            type="radio"
                                                            id={`${sz}-btn`}
                                                            checked={selectedSize === sz}
                                                            onChange={() => setSelectedSize(sz)}
                                                        />
                                                        {sz}
                                                    </label>
                                                ))}
                                            </div>
                                        </li>
                                        <li>
                                            <span>Promotions:</span>
                                            <p>{product.promotions.join(", ")}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs: Description, Specification, Reviews */}
                    <div className="col-lg-12">
                        <div className="product__details__tab">
                            <Tabs defaultActiveKey="description" items={items} centered={true}/>
                        </div>
                    </div>

                    {/* Related Products */}
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="related__title">
                                <h5>RELATED PRODUCTS</h5>
                            </div>
                        </div>
                        {relatedProducts.map((rp) => (
                            <div className="col-lg-3 col-md-4 col-sm-6" key={rp.id}>
                                <div className="product__item">
                                    {/* Ảnh background */}
                                    <div
                                        className="product__item__pic set-bg"
                                        style={{backgroundImage: `url(${rp.imgUrl})`}}
                                    >
                                        {rp.isNew && <div className="label new">New</div>}
                                        <ul className="product__hover">
                                            <li>
                                                <a href={rp.imgUrl} className="image-popup">
                                                    <span className="arrow_expand"></span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="icon_heart_alt"></span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="icon_bag_alt"></span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="product__item__text">
                                        <h6>
                                            <a href="#">{rp.name}</a>
                                        </h6>
                                        <div className="rating">
                                            {Array.from({length: rp.rating}).map((_, i) => (
                                                <i key={i} className="fa fa-star"></i>
                                            ))}
                                        </div>
                                        <div className="product__price">${rp.price}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProductDetail;

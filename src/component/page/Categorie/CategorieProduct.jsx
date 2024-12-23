import React, {useEffect, useState} from "react";
import API from "../../service/service.jsx";
import {Link, useParams} from "react-router-dom";
import {Slider} from "antd";
import Popup from "reactjs-popup";

function CategorieProduct() {
    const [products, setProducts] = useState([]);
    const id_category = useParams().id;
    const [value, setValue] = useState([20, 80]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await API.get("product/list/");
                setProducts(response.data.results);
            } catch (error) {
                console.error("There was an error fetching the categories:", error);
            }
        };

        fetchProducts();
    }, []);

    const renderProduct = () => {
        if (!products || products.length === 0) {
            return <div id="preloder"><div className="loader"></div></div>;
        }

        return products
            .filter((product) => product.category === parseInt(id_category)) // Lọc theo `id_category`
            .map((product, index) => (
                <div className="col-lg-4 col-md-6" key={index}>
                    <div className="product__item">
                        <div
                            className="product__item__pic set-bg"
                            style={{
                                backgroundImage: `url(${product.main_image})`,
                            }}
                        >
                            {product.is_new && <div className="label new">New</div>}
                            {product.is_sale && <div className="label">Sale</div>}
                            <ul className="product__hover">
                                <li>
                                    <Popup
                                        trigger={<a><span className="arrow_expand"></span></a>}
                                        contentStyle={{width: 350, border: "none", borderRadius: 15}}
                                        modal
                                    >
                                        <div className="popup-image">
                                            <img src={product.main_image} alt={product.name}/>
                                        </div>
                                    </Popup>
                                </li>
                                <li><a href="#"><span className="icon_heart_alt"></span></a></li>
                                <li><a href="#"><span className="icon_bag_alt"></span></a></li>
                            </ul>
                        </div>
                        <div className="product__item__text">
                            <h6><Link to={`/product/${product.id}`} state={{product}}>{product.name}</Link></h6>
                            <div className="rating">
                                {Array.from({length: 5}, (_, i) => (
                                    <i key={i} className={`fa ${i < product.rating ? "fa-star" : "fa-star-o"}`}></i>
                                ))}
                            </div>
                            <div className="product__price">
                                ${product.price}
                                {product.old_price && (
                                    <span>${product.old_price}</span> // Hiển thị giá cũ nếu có
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ));
    };

    return (
        <div>
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link className="breadcrumb__item" to="/"><i className="fa fa-home"></i> Home</Link>
                                <Link className="breadcrumb__item" to="/category">Category</Link>
                                <span>Products</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="shop spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3">
                            <div className="shop__sidebar">
                                <div className="sidebar__categories">
                                    <div className="section-title">
                                        <h4>Categories</h4>
                                    </div>
                                    <div className="categories__accordion">
                                        <div className="accordion" id="accordionExample">
                                            <div className="card">
                                                <div className="card-heading active">
                                                    <a data-toggle="collapse" data-target="#collapseOne">Women</a>
                                                </div>
                                                <div id="collapseOne" className="collapse show"
                                                     data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <ul>
                                                            <li><a href="#">Coats</a></li>
                                                            <li><a href="#">Jackets</a></li>
                                                            <li><a href="#">Dresses</a></li>
                                                            <li><a href="#">Shirts</a></li>
                                                            <li><a href="#">T-shirts</a></li>
                                                            <li><a href="#">Jeans</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-heading">
                                                    <a data-toggle="collapse" data-target="#collapseTwo">Men</a>
                                                </div>
                                                <div id="collapseTwo" className="collapse"
                                                     data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <ul>
                                                            <li><a href="#">Coats</a></li>
                                                            <li><a href="#">Jackets</a></li>
                                                            <li><a href="#">Dresses</a></li>
                                                            <li><a href="#">Shirts</a></li>
                                                            <li><a href="#">T-shirts</a></li>
                                                            <li><a href="#">Jeans</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-heading">
                                                    <a data-toggle="collapse" data-target="#collapseThree">Kids</a>
                                                </div>
                                                <div id="collapseThree" className="collapse"
                                                     data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <ul>
                                                            <li><a href="#">Coats</a></li>
                                                            <li><a href="#">Jackets</a></li>
                                                            <li><a href="#">Dresses</a></li>
                                                            <li><a href="#">Shirts</a></li>
                                                            <li><a href="#">T-shirts</a></li>
                                                            <li><a href="#">Jeans</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-heading">
                                                    <a data-toggle="collapse"
                                                       data-target="#collapseFour">Accessories</a>
                                                </div>
                                                <div id="collapseFour" className="collapse"
                                                     data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <ul>
                                                            <li><a href="#">Coats</a></li>
                                                            <li><a href="#">Jackets</a></li>
                                                            <li><a href="#">Dresses</a></li>
                                                            <li><a href="#">Shirts</a></li>
                                                            <li><a href="#">T-shirts</a></li>
                                                            <li><a href="#">Jeans</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-heading">
                                                    <a data-toggle="collapse" data-target="#collapseFive">Cosmetic</a>
                                                </div>
                                                <div id="collapseFive" className="collapse"
                                                     data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <ul>
                                                            <li><a href="#">Coats</a></li>
                                                            <li><a href="#">Jackets</a></li>
                                                            <li><a href="#">Dresses</a></li>
                                                            <li><a href="#">Shirts</a></li>
                                                            <li><a href="#">T-shirts</a></li>
                                                            <li><a href="#">Jeans</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidebar__filter">
                                    <div className="section-title">
                                        <h4>Shop by price</h4>
                                    </div>
                                    <div className="filter-range-wrap">
                                        <Slider range={{draggableTrack: true}}
                                                value={value}
                                                onChange={setValue}
                                                styles={{
                                                    track: {
                                                        background: '#ca1515'
                                                    }
                                                }}
                                        />
                                        <div className="range-slider">
                                            <div className="price-input">
                                                <p>Price: </p>
                                                <span>{' ' + value[0]}</span> - <span>{value[1]}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#">Filter</a>
                                </div>
                                <div className="sidebar__sizes">
                                    <div className="section-title">
                                        <h4>Shop by size</h4>
                                    </div>
                                    <div className="size__list">
                                        <label htmlFor="xxs">
                                            xxs
                                            <input type="checkbox" id="xxs"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="xs">
                                            xs
                                            <input type="checkbox" id="xs"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="xss">
                                            xs-s
                                            <input type="checkbox" id="xss"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="s">
                                            s
                                            <input type="checkbox" id="s"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="m">
                                            m
                                            <input type="checkbox" id="m"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="ml">
                                            m-l
                                            <input type="checkbox" id="ml"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="l">
                                            l
                                            <input type="checkbox" id="l"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="xl">
                                            xl
                                            <input type="checkbox" id="xl"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="sidebar__color">
                                    <div className="section-title">
                                        <h4>Shop by size</h4>
                                    </div>
                                    <div className="size__list color__list">
                                        <label htmlFor="black">
                                            Blacks
                                            <input type="checkbox" id="black"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="whites">
                                            Whites
                                            <input type="checkbox" id="whites"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="reds">
                                            Reds
                                            <input type="checkbox" id="reds"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="greys">
                                            Greys
                                            <input type="checkbox" id="greys"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="blues">
                                            Blues
                                            <input type="checkbox" id="blues"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="beige">
                                            Beige Tones
                                            <input type="checkbox" id="beige"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="greens">
                                            Greens
                                            <input type="checkbox" id="greens"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="yellows">
                                            Yellows
                                            <input type="checkbox" id="yellows"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9">
                            <div className="row">
                                {renderProduct()}
                                <div className="col-lg-12 text-center">
                                    <div className="pagination__option">
                                        <a href="#">1</a>
                                        <a href="#">2</a>
                                        <a href="#">3</a>
                                        <a href="#"><i className="fa fa-angle-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CategorieProduct;
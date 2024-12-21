import {Link} from "react-router-dom";
import {Button, Empty, Typography, InputNumber} from 'antd';

function ShopCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const renderCart = () => {
        if (cart.length === 0) {
            return <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                    height: 60,
                }}
                description={
                    <Typography.Text>
                        Customize <a href="#API">Description</a>
                    </Typography.Text>
                }
            >
                <Button type="primary">Create Now</Button>
            </Empty>
        } else {
            return cart.map((p, index) => {
                return <tr key={index}>
                    <td className="cart__product__item">
                        <img src={p.image} alt="" width="80"/>
                        <div className="cart__product__item__title">
                            <h6>{p.name}</h6>
                            <div className="rating">
                                {Array.from({length: 5}, (v, i) => {
                                    return <i key={i} className={`fa fa-star${i < p.rating ? '' : '-o'}`}></i>
                                })}
                            </div>
                        </div>
                    </td>
                    <td className="cart__price">${p.price}</td>
                    <td className="cart__quantity">
                        <InputNumber
                            style={{width: 60}}
                            min={1}
                            max={100}
                            keyboard={true}
                            defaultValue={p.quantity}
                            size="small"
                        />
                    </td>
                    <td className="cart__total">${p.price * p.quantity}</td>
                    <td className="cart__close">
                        <span className="icon_close" onClick={() => removeProduct(p.id)}></span>
                    </td>
                </tr>
            })
        }
    }
    return (
        <div>
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link to="/" className="breadcrumb__item"><i className="fa fa-home"></i> Home</Link>
                                <span>Shopping cart</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="shop-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shop__cart__table">
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
                            <div className="cart__btn">
                                <a href="/shop">Continue Shopping</a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="cart__btn update__btn">
                                <a href=""><span className="icon_loading"></span> Update cart</a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="discount__content">
                                <h6>Discount codes</h6>
                                <form action="#">
                                    <input type="text" placeholder="Enter your coupon code"/>
                                    <button type="submit" className="site-btn">Apply</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4 offset-lg-2">
                            <div className="cart__total__procced">
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
        </div>
    );
}

export default ShopCart;
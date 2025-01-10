import {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import API from "../../../service/service.jsx";
import useUserContext from "../../../hooks/useUserContext.jsx";
import './OrderDetail.css'; // Create a separate CSS file for OrderDetail
import {Tag, Spin} from "antd";

function OrderDetail() {
    const {userData, logout} = useUserContext();
    const auth = {
        headers: {
            Authorization: `Bearer ${userData.access}`
        }
    };
    const {id} = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        API.get(`orders/view/${id}/`, auth)
            .then(response => {
                setOrder(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError("Failed to load order details.");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div style={{textAlign: 'center', marginTop: '50px'}}>
                <Spin tip="Loading order details..." size="large"/>
            </div>
        );
    }

    if (error) {
        return (
            <p className="error">{error}</p>
        );
    }

    if (!order) {
        return (
            <p>No order details found.</p>
        );
    }

    // Helper function to format currency
    const formatCurrency = (amount) => {
        return parseFloat(amount).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    return (
        <div className="container">
            <Link to="/account/orders">Back to Orders</Link>
            {/* Header */}
            <div className="order-header">

                <h1>Order Details</h1>
                <p className="order-id">Order Number: <strong>{order.order_number}</strong></p>
            </div>

            {/* Status */}
            <div className="order-status">
                <div className={`status-item ${order.status === 'PENDING' ? 'active' : ''}`}>
                    Order Placed<br/><small>{new Date(order.created_at).toLocaleString()}</small>
                </div>
                <div
                    className={`status-item ${['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.status) ? 'active' : ''}`}>
                    Confirmed<br/><small>{new Date(order.updated_at).toLocaleString()}</small>
                </div>
                <div className={`status-item ${['SHIPPED', 'DELIVERED'].includes(order.status) ? 'active' : ''}`}>
                    Shipping<br/><small>{order.tracking_number || 'N/A'}</small>
                </div>
                <div className={`status-item ${order.status === 'DELIVERED' ? 'active' : ''}`}>
                    Delivered
                </div>
            </div>

            {/* Order Info */}
            <div className="order-info">
                <h3>Product Information</h3>
                <hr/>
                {order.items.map((item, index) => (
                    <div key={index} className="row">
                        <img
                            className="col-2"
                            style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                marginRight: '20px',
                                borderRadius: '4px',
                            }}
                            src={item.product_image || '/default.jpg'}
                            alt={item.product_name || 'Product'}
                        />
                        <div className="col-8">
                            <p><strong>{item.product_name}</strong></p>
                            <p>Size: {item.size}</p>
                            <p>Color: {item.color}</p>
                        </div>
                        <div className="col-2">
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: {formatCurrency(item.price)}</p>
                            <p>Total: <strong>{formatCurrency(item.total_price)}</strong></p>
                        </div>
                        <hr/>
                    </div>
                ))}
            </div>

            {/* Payment Info */}
            <div className="payment-info">
                <h5>Payment Information</h5>
                <table>
                    <tr>
                        <th>Product Subtotal:</th>
                        <td>{formatCurrency(order.subtotal_price)}</td>
                    </tr>
                    <tr>
                        <th>Shipping Fee:</th>
                        <td>{order.shipping_cost === "0.00" ? 'Free' : formatCurrency(order.shipping_cost)}</td>
                    </tr>
                    <tr>
                        <th>Discount:</th>
                        <td>{order.discount_amount === "0.00" ? 'None' : `-${formatCurrency(order.discount_amount)}`}</td>
                    </tr>
                    <tr>
                        <th>Tax:</th>
                        <td>{formatCurrency(order.tax_amount)}</td>
                    </tr>
                    <tr>
                        <th>Total Payment:</th>
                        <td><strong>{formatCurrency(order.total_price)}</strong></td>
                    </tr>
                </table>
            </div>

            {/* Customer Info */}
            <div className="customer-info">
                <h5>Customer Information</h5>
                <p><strong>Name:</strong> {order.user}</p>
                <p><strong>Phone:</strong> {order.customer}</p>
                <p><strong>Address:</strong> {order.shipping_address_text}</p>
            </div>

            {/* Support Info */}
            <div className="support-info">
                <h3>Support Information</h3>
                <p>Store Phone Number: (024) 7109 1011</p>
                <p>Store Address: 11 Nguyễn Văn Thoại, P. An Hải Đông, Q. Sơn Trà, Đà Nẵng</p>
            </div>

            {/* Warranty Info */}
            <div className="warranty-info">
                <h3>Warranty Centers</h3>
                <p><a href="#">List of Warranty Centers</a></p>
                <p><a href="#">Warranty at Cellphones</a></p>
            </div>
        </div>
    );
}

export default OrderDetail;

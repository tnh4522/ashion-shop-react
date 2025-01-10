import React, { useEffect, useState } from 'react';
import API from "../../../service/service.jsx";
import useUserContext from "../../../hooks/useUserContext.jsx";
import './Orders.css';
import { Flex, Tag, Pagination, message } from "antd";

function Orders() {
    const { userData, logout } = useUserContext();
    const [orders, setOrders] = useState([]);
    const [selectedTab, setSelectedTab] = useState('All');
    const [filterDate, setFilterDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Số đơn hàng mỗi trang
    const [totalOrders, setTotalOrders] = useState(0);

    const auth = {
        headers: {
            Authorization: `Bearer ${userData.access}`
        }
    };

    const statusMap = {
        'All': '',
        'Pending Confirmation': 'PENDING',
        'Confirmed': 'PROCESSING',
        'Shipping': 'SHIPPED',
        'Delivered': 'DELIVERED',
        'Cancelled': 'CANCELED'
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTab, filterDate]);

    useEffect(() => {
        fetchOrders();
    }, [selectedTab, filterDate, currentPage, pageSize]);

    const fetchOrders = () => {
        setLoading(true);
        setError(null);

        let params = {
            page: currentPage,
            page_size: pageSize,
        };

        const statusValue = statusMap[selectedTab];
        if (statusValue) {
            params.status = statusValue;
        }

        if (filterDate) {
            params.date = filterDate;
        }

        API.get('orders/user/', { headers: auth.headers, params })
            .then(response => {
                console.log("API response:", response.data);

                if (response.data.results && typeof response.data.count === 'number') {
                    setOrders(response.data.results);
                    setTotalOrders(response.data.count);
                } else {
                    console.error("Unexpected API response structure:", response.data);
                    setError("Unexpected response from server.");
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching order list:", error);
                setError("Failed to load orders. Please try again later.");
                setLoading(false);
            });
    };

    const renderOrderStatusTag = (status) => {
        let color = 'default';

        switch (status) {
            case 'PENDING':
                color = 'gold';
                break;
            case 'PROCESSING':
                color = 'blue';
                break;
            case 'SHIPPED':
                color = 'cyan';
                break;
            case 'DELIVERED':
                color = 'green';
                break;
            case 'CANCELED':
                color = 'red';
                break;
            default:
                color = 'default';
        }

        return (
            <Tag color={color}>{status}</Tag>
        );
    }

    const renderPaymentStatusTag = (status) => {
        let color = 'default';

        switch (status) {
            case 'PENDING':
                color = 'gold';
                break;
            case 'PAID':
                color = 'green';
                break;
            case 'FAILED':
                color = 'red';
                break;
            default:
                color = 'default';
        }

        return (
            <Tag color={color} className="mx-3">{status}</Tag>
        );
    }

    const handlePageChange = (page, newPageSize) => {
        setCurrentPage(page);
        setPageSize(newPageSize);
    };

    return (
        <div>
            <div className="filter-bar">
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
                {/* Thêm các phần tử lọc khác nếu cần */}
            </div>

            <div className="tabs">
                {Object.keys(statusMap).map(tab => (
                    <button
                        key={tab}
                        className={selectedTab === tab ? 'active' : ''}
                        onClick={() => setSelectedTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {loading ? (
                <p>Loading orders...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : orders.length > 0 ? (
                <>
                    {orders.map(order => (
                        <div key={order.id} className="order">
                            {/* Kiểm tra items trước khi truy cập */}
                            <img src={order.items && order.items.length > 0 ? (order.items[0].product_image || 'default.jpg') : 'default.jpg'} alt={order.items && order.items.length > 0 ? order.items[0].product_name : 'Product'} />
                            <div className="order-info">
                                <Flex>
                                    <h3>{order.items && order.items.length > 0 ? order.items[0].product_name : 'Unnamed Product'}</h3>
                                    {renderPaymentStatusTag(order.payment_status)}
                                    {renderOrderStatusTag(order.status)}
                                </Flex>
                                <p className="price">$ {order.items && order.items.length > 0 ? order.items[0].price : 'N/A'}</p>
                                <p className="date">{new Date(order.created_at).toLocaleString()}</p>
                            </div>
                            <div className="actions">
                                <button className="invoice" onClick={() => viewInvoice(order.id)}>View Invoice</button>
                                <button className="details" onClick={() => viewDetails(order.id)}>View Details</button>
                            </div>
                        </div>
                    ))}

                    <div style={{ textAlign: 'center', marginTop: '20px' }} className="pagination">
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={totalOrders}
                            onChange={handlePageChange}
                            showSizeChanger
                            pageSizeOptions={['5', '10', '20', '50']}
                            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} orders`}
                        />
                    </div>
                </>
            ) : (
                <p>Your order list will be displayed here.</p>
            )}
        </div>
    );

    function viewInvoice(orderId) {
        console.log(`View invoice for order ${orderId}`);
        message.info(`View invoice for order ${orderId}`);
    }

    function viewDetails(orderId) {
        console.log(`View details for order ${orderId}`);
        message.info(`View details for order ${orderId}`);
    }
}

export default Orders;

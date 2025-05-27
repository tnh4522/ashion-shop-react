import React, {useContext, useEffect} from "react";
import API from "../../service/service.jsx";
import useUserContext from "../../hooks/useUserContext.jsx";
import {CartContext} from "../../contexts/CartContext.jsx";
import emailjs from '@emailjs/browser';

function SuccessOrder() {
    const {removeFromCart} = useContext(CartContext);
    const {userData, logout} = useUserContext();
    const url = window.location.href;
    const order = JSON.parse(localStorage.getItem('order'));
    let transactionID = '';
    let orderCode = '';
    let eventId = '';

    const hashIndex = url.indexOf("#");
    if (hashIndex !== -1) {
        const hashPart = url.slice(hashIndex + 1);
        const queryIndex = hashPart.indexOf("?");
        if (queryIndex !== -1) {
            const queryPart = hashPart.slice(queryIndex + 1);
            const params = new URLSearchParams(queryPart);

            transactionID = params.get("transactionID");
            orderCode = params.get("s");
            eventId = params.get("eventId");
        } else {
            console.error("Không tìm thấy query parameters trong phần hash.");
        }
    } else {
        console.error("Không tìm thấy phần hash trong URL.");
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (transactionID !== '' && orderCode !== '' && eventId !== '') {
            API.post("payment/check/", {
                transactionID: transactionID,
                orderCode: orderCode,
                eventId: eventId,
                orderNumber: order.order_number,
            }, {
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${userData.access}`,
                }
            }).then(response => {
                const mailData = JSON.parse(localStorage.getItem('mailData'));
                emailjs
                    .send("service_p88ktvq", "template_pxpdee5", mailData, "vEgBXEZLP-EKkISxc")
                    .then((result) => {
                        console.log("Order confirmation email sent:", result.text);
                    })
                    .catch((error) => {
                        console.error("Error sending order confirmation:", error.text);
                    })
                localStorage.removeItem('mailData');

                if (response.data.order) {
                    const cart = JSON.parse(localStorage.getItem('cart'));
                    cart.forEach(item => {
                        removeFromCart(item.id);
                    });

                    localStorage.removeItem('order');
                    localStorage.removeItem('cart');
                }
            }).catch(error => {
                console.error("Có lỗi xảy ra khi xác nhận thanh toán:", error);
            })
        }
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
                    alt="Cart"
                    style={styles.icon}
                />
                <h1 style={styles.title}>THANK YOU</h1>
                <h2 style={styles.subtitle}>FOR YOUR PURCHASE</h2>
            </div>
            <p style={styles.message}>
                We cannot say it enough: thank you for all your support! We would love
                your feedback. Go to our website and tell us your opinion.
            </p>
            <button style={styles.button} onClick={() => window.location.href = "/"}>
                Go to our website
            </button>
            <p style={styles.contact}>
                Anything amiss? Email us or call us at (610) 888-1111
            </p>
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
        fontFamily: "'Arial', sans-serif",
        padding: "20px",
        backgroundColor: "#fdf6f9",
        color: "#333",
    },
    header: {
        marginBottom: "20px",
    },
    icon: {
        width: "80px",
        marginBottom: "10px",
    },
    title: {
        fontSize: "36px",
        color: "#f06292",
        margin: "0",
    },
    subtitle: {
        fontSize: "24px",
        fontWeight: "bold",
        margin: "0",
    },
    message: {
        fontSize: "16px",
        margin: "20px 0",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#f06292",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        marginBottom: "20px",
    },
    buttonHover: {
        backgroundColor: "#e91e63",
    },
    contact: {
        fontSize: "14px",
        color: "#555",
    },
};

export default SuccessOrder;

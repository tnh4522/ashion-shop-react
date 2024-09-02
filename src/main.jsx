import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ErrorPage from "./component/layout/ErrorPage.jsx";
import ContactPage from "./component/page/ContactPage.jsx";
import BlogPage from "./component/page/Blog/BlogPage.jsx";
import BlogDetail from "./component/page/Blog/BlogDetail.jsx";
import CheckoutPage from "./component/page/Checkout/CheckoutPage.jsx";
import HomePage from "./component/page/Home/HomePage.jsx";
import Products from "./component/page/Product/Products.jsx";
import ProductDetail from "./component/page/Product/ProductDetail.jsx";
import ShopCart from "./component/page/Cart/ShopCart.jsx";
import LoginPage from "./component/page/User/LoginPage.jsx";
import RegisterPage from "./component/page/User/RegisterPage.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <App>
                <Routes>
                    <Route path="*" element={<ErrorPage/>}/>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/shop" element={<Products/>}/>
                    <Route path="/product" element={<ProductDetail/>}/>
                    <Route path="/cart" element={<ShopCart/>}/>
                    <Route path="/contact" element={<ContactPage/>}/>
                    <Route path="/blog" element={<BlogPage/>}/>
                    <Route path="/blog/:id" element={<BlogDetail/>}/>
                    <Route path="/check-out" element={<CheckoutPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage />}/>
                </Routes>
            </App>
        </Router>
    </StrictMode>
)

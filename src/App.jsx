import Header from './component/layout/Header.jsx'
import Footer from "./component/layout/Footer.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";
import ErrorPage from "./component/layout/ErrorPage.jsx";
import ContactPage from "./component/page/ContactPage.jsx";
import BlogPage from "./component/page/Blog/BlogPage.jsx";
import BlogDetail from "./component/page/Blog/BlogDetail.jsx";
import CheckoutPage from "./component/page/Checkout/CheckoutPage.jsx";

const Loading = () => (
    <div id="preloder">
        <div className="loader"></div>
    </div>
);

const HomePage = lazy(() => delayForDemo(import('./component/page/Home/HomePage.jsx')));
const Products = lazy(() => delayForDemo(import('./component/page/Product/Products.jsx')));
const ProductDetail = lazy(() => delayForDemo(import('./component/page/Product/ProductDetail.jsx')));
const Cart = lazy(() => delayForDemo(import('./component/page/Cart/ShopCart.jsx')));

function App(props) {
    return (
        <Router>
            <Header/>
            <Suspense fallback={<Loading/>}>
                <Routes>
                    <Route path="*" element={<ErrorPage/>}/>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/shop" element={<Products/>}/>
                    <Route path="/product" element={<ProductDetail/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/contact" element={<ContactPage/>}/>
                    <Route path="/blog" element={<BlogPage/>}/>
                    <Route path="/blog/:id" element={<BlogDetail/>}/>
                    <Route path="/check-out" element={<CheckoutPage/>}/>
                </Routes>
            </Suspense>
            <Footer/>
        </Router>
    )
}

export default App

function delayForDemo(promise) {
    return new Promise(resolve => {
        setTimeout(resolve, 300);
    }).then(() => promise);
}

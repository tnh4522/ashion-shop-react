import React from "react";
import Header from './component/layout/Header.jsx'
import Footer from "./component/layout/Footer.jsx";
import MenuOffcanvas from "./component/layout/MenuOffcanvas.jsx";
import ShowOffCanvasContextProvider from "./component/contexts/ShowOffCanvasContext.jsx";
import CartOffCanvas from "./component/layout/CartOffCanvas.jsx";
import 'reactjs-popup/dist/index.css';
import WishListOffCanvas from "./component/layout/WishListOffCanvas.jsx";
import NotificationContextProvider from "./component/contexts/NotificationContext.jsx";
import UserContextProvider from "./component/contexts/UserContext.jsx";
import {CartProvider} from "./component/contexts/CartContext.jsx";


function App({children}) {
    return (
        <NotificationContextProvider>
            <UserContextProvider>
                <CartProvider>
                    <ShowOffCanvasContextProvider>
                        <CartOffCanvas/>
                        <MenuOffcanvas/>
                        <WishListOffCanvas/>
                        <Header/>
                        {children}
                        <Footer/>
                    </ShowOffCanvasContextProvider>
                </CartProvider>
            </UserContextProvider>
        </NotificationContextProvider>
    )
}

export default App


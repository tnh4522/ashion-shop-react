import React from "react";
import Header from './component/layout/Header.jsx'
import Footer from "./component/layout/Footer.jsx";
import MenuOffcanvas from "./component/layout/MenuOffcanvas.jsx";
import ShowOffCanvasContextProvider from "./component/contexts/ShowOffCanvasContext.jsx";
import CartOffCanvas from "./component/layout/CartOffCanvas.jsx";

import 'reactjs-popup/dist/index.css';
import WishListOffCanvas from "./component/layout/WishListOffCanvas.jsx";


function App({children}) {
    return (
        <ShowOffCanvasContextProvider>
            <CartOffCanvas/>
            <MenuOffcanvas/>
            <WishListOffCanvas/>
            <Header/>
            {children}
            <Footer/>
        </ShowOffCanvasContextProvider>
    )
}

export default App


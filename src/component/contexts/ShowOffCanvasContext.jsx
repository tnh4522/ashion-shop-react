import React from 'react'
import {createContext, useState} from 'react'

export const ShowOffCanvasContext = createContext();

const ShowOffCanvasContextProvider = ({children}) => {

    const [showMenu, setShowMenu] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [loadCart, setLoadCart] = useState(false);
    const [showWishlist, setShowWishlist] = useState(false);

    const toggleShowMenu = (showMenu) => {
        setShowMenu(showMenu);
    };

    const toggleShowCart = (showCart) => {
        setLoadCart(showCart);
        setShowCart(showCart);
    };

    const toggleShowWishlist = (showWishlist) => {
        setShowWishlist(showWishlist);
    }

    return <ShowOffCanvasContext.Provider
        value={{
            showMenu, toggleShowMenu,
            showCart, toggleShowCart,
            showWishlist, toggleShowWishlist, loadCart
        }}>{children}</ShowOffCanvasContext.Provider>
}

export default ShowOffCanvasContextProvider;

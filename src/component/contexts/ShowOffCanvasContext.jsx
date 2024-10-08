import React from 'react'
import {createContext, useState} from 'react'

export const ShowOffCanvasContext = createContext();

const ShowOffCanvasContextProvider = ({children}) => {

    const [showMenu, setShowMenu] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showWishlist, setShowWishlist] = useState(false);

    const toggleShowMenu = (showMenu) => {
        setShowMenu(showMenu);
    };

    const toggleShowCart = (showCart) => {
        setShowCart(showCart);
    };

    const toggleShowWishlist = (showWishlist) => {
        setShowWishlist(showWishlist);
    }

    return <ShowOffCanvasContext.Provider
        value={{
            showMenu, toggleShowMenu,
            showCart, toggleShowCart,
            showWishlist, toggleShowWishlist
        }}>{children}</ShowOffCanvasContext.Provider>
}

export default ShowOffCanvasContextProvider;

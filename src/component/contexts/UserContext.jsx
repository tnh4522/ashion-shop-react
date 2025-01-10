import {createContext, useState, useEffect} from 'react';
import API from "../service/service.jsx";

export const UserContext = createContext();

function UserContextProvider({children}) {
    const [userData, setUserData] = useState(() => {
        const data = localStorage.getItem('user');
        return data ? JSON.parse(data) : null;
    });

    useEffect(() => {
        if (userData) {
            localStorage.setItem('data', JSON.stringify(userData));
        } else {
            localStorage.removeItem('data');
        }
    }, [userData]);

    const logout = () => {
        const payload = JSON.parse(localStorage.getItem('cart'));
        API.post('/cart/save/', payload, {
            headers: {
                'Authorization': `Bearer ${userData.access}`,
            }
        }).then(response => {
            console.log("Cart saved:", response);
            if(response.status === 200) {
                localStorage.removeItem('cart');
            }
        }).catch(error => {
            console.error("Error saving cart:", error);
        });
        localStorage.removeItem('user');
        setUserData(null);
        window.location.reload();
    };

    return (
        <UserContext.Provider value={{userData, setUserData, logout}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;

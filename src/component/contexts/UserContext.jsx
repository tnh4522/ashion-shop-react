import {createContext, useState, useEffect} from 'react';

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
        localStorage.removeItem('user');
        setUserData(null);
        window.location.reload(); // Reload the page to reset the state/UI
    };

    return (
        <UserContext.Provider value={{userData, setUserData, logout}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;

import React, { useState, createContext, useEffect } from 'react';
import { API_URL } from '../CommonVar';

export const UserContext = createContext();
export const UserProvider = (props) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState({});    
    useEffect(() => {
        (async () => {
            const res = await fetch(`${API_URL}/api/user/info`, {
                credentials: 'include'
            });
            if (res.status === 200) {
                setIsLogin(true);
                const resData = await res.json();
                setUserInfo(resData);
            }
        })();
    }, [isLogin])
    
    
    return (
        <UserContext.Provider value={{ isLogin, setIsLogin, userInfo }}>
            {props.children}
        </UserContext.Provider>
    )
}
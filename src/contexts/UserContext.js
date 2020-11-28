import React, { useState, createContext, useEffect } from 'react';
import { API_URL } from '../CommonVar';
import Spinner from '../components/Spinner';

export const UserContext = createContext();
export const UserProvider = (props) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState({});   
    const [isFetching, setIsFetching] = useState(true); 
    useEffect(() => {        
        (async () => { 
            setIsFetching(true);           
            const res = await fetch(`${API_URL}/api/user/info`, {
                credentials: 'include'
            });
            if (res.status === 200) {
                setIsLogin(true);
                const resData = await res.json();
                setUserInfo(resData);
            }
            setIsFetching(false);
        })();
    }, [isLogin])
        
    return (
        <UserContext.Provider value={{ isLogin, setIsLogin, userInfo }}>
            {isFetching ? <Spinner /> : props.children}
        </UserContext.Provider>
    )
}
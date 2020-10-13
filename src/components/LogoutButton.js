import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const LogoutButton = () => {
    const { setIsLogin } = useContext(UserContext);
    const logoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        setIsLogin(false);
    };

    return (<button onClick={logoutHandler}>Logout</button>);
}

export default LogoutButton;
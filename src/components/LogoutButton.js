import React, { useContext } from 'react';
import { NotificationManager } from 'react-notifications';
import { UserContext } from '../contexts/UserContext';

const LogoutButton = () => {
    const { setIsLogin } = useContext(UserContext);
    const logoutHandler = (e) => {
        e.preventDefault();
        document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsLogin(false);
        NotificationManager.success('Đã đăng xuất!', 'Logout!');        
    };

    return (<button onClick={logoutHandler}>Logout</button>);
}

export default LogoutButton;
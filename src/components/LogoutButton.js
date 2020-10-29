import React, { useContext } from 'react';
import { NotificationManager } from 'react-notifications';
import { UserContext } from '../contexts/UserContext';
import { API_URL } from '../CommonVar';

const LogoutButton = () => {
    const { setIsLogin } = useContext(UserContext);
    const logoutHandler = (e) => {
        e.preventDefault();        
        fetch(`${API_URL}/api/user/logout`, {
            credentials: 'include'
        })
            .then(() => {
                setIsLogin(false);
                NotificationManager.success('Đã đăng xuất!', 'Logout!');  
            })      
    };

    return (<button onClick={logoutHandler}>Logout</button>);
}

export default LogoutButton;
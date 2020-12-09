import React, { useContext } from 'react';
import { NotificationManager } from 'react-notifications';
import { UserContext } from '../contexts/UserContext';
import { API_URL } from '../CommonVar';

const LogoutButton = ({ className }) => {
    const { setIsLogin } = useContext(UserContext);
    const logoutHandler = (e) => {
        e.preventDefault();        
        fetch(`${API_URL}/api/auth/logout`, {
            credentials: 'include'
        })
            .then(() => {
                setIsLogin(false);
                NotificationManager.success('Đã đăng xuất!', 'Logout!');  
            })      
    };

    return (
    <div className={className} onClick={logoutHandler}>
        <i className="fas fa-sign-out-alt icon"></i>
        <span>Đăng xuất</span>
    </div>
    )
};

export default LogoutButton;
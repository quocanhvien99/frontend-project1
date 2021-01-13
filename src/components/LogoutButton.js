import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { API_URL } from '../apiURL';

const LogoutButton = ({ className }) => {
	const { setIsLogin } = useContext(UserContext);
	const logoutHandler = (e) => {
		e.preventDefault();
		fetch(`${API_URL}/api/auth/logout`, {
			credentials: 'include',
		}).then(() => {
			setIsLogin(false);
		});
	};

	return (
		<div className={className} onClick={logoutHandler}>
			<i className="fas fa-sign-out-alt icon"></i>
			<span>Đăng xuất</span>
		</div>
	);
};

export default LogoutButton;

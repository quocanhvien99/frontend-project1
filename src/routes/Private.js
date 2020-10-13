import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import './Private.css';

const Private = (props) => {
    const { userInfo } = useContext(UserContext);

    return (
        <div className="Private">
            <div className="name">Tên: {userInfo.name}</div>
            <div className="email">Email: {userInfo.email}</div>
            <div className="date">Ngày đăng ký: {userInfo.date}</div>
        </div>
    )
}
export default Private;
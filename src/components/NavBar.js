import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import './NavBar.css';

const NavBar = ({ setActiveSideBar }) => {
    const { userInfo } = useContext(UserContext);
    const clickHandle = () => {
        setActiveSideBar(true);
    }

    return (
        <div className="NavBar">
            <div className="hamburger" onClick={clickHandle}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="user-info">
                <div className="info">
                    <div>{userInfo.name}</div>
                    <div>{userInfo.isAdmin?'Quản lý':'Người dùng'}</div>
                </div>
                <span class="material-icons-outlined icon">
                    account_circle
                </span>
            </div>
        </div>
    )
};
export default NavBar;
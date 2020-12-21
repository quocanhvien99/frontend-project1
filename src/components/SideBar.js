import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import LogoutButton from './LogoutButton';
import './SideBar.css';

const SideBar = ({ activeSideBar, setActiveSideBar }) => {   
    const { userInfo } = useContext(UserContext);

    return (
        <div className={activeSideBar?'SideBar SideBar-active':'SideBar'}>
            <div className={activeSideBar?'SideBar-Container SideBar-Container-Active':'SideBar-Container'}>
                <div className="header">
                    <h2 className="logo">Dashboard</h2>
                    <div className="close-btn" onClick={() => setActiveSideBar(false)}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                    </div>
                </div>
                <NavLink to="/reports" activeClassName="selected">
                    <div className="sidebar-item">
                        <span className="material-icons icon">format_list_bulleted</span>
                        <span>Báo cáo</span>
                    </div>
                </NavLink>
                <NavLink to="/statistic" activeClassName="selected">
                    <div className="sidebar-item">
                        <span className="material-icons icon">bar_chart</span>
                        <span>Thống kê</span>
                    </div>
                </NavLink>
                {userInfo.isAdmin && (<NavLink to="/users" activeClassName="selected">
                    <div className="sidebar-item">
                        <span className="material-icons icon">groups</span>
                        <span>Người dùng</span>
                    </div>
                </NavLink>)}
                {userInfo.isAdmin && (<NavLink to="/content" activeClassName="selected">
                    <div className="sidebar-item">
                        <span className="material-icons-outlined icon">text_snippet</span>
                        <span>Nội dung</span>
                    </div>
                </NavLink>)}
                <div className="logout-btn">
                    <LogoutButton className="sidebar-item" />
                </div>
            </div>
            
            
        </div>       
    )
};

export default SideBar;
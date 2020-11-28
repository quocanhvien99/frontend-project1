import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = () => {
    const location = useLocation();
    let route;
    switch(location.pathname) {
        case '/reports':
            route = 'Báo cáo';
            break;
        case '/users':
            route = 'Người dùng';
            break;
        case '/statistic':
            route = 'Thống kê';
            break;
        default:
            route = undefined;
    }
    return (
        <div className="Breadcrumb">
            <NavLink exact to="/" activeClassName="active">
                <span class="material-icons-outlined icon">home</span>
            </NavLink>
            {route && (<span> / </span>)}
            {route && (<span>{route}</span>)}
        </div>
    )
}

export default Breadcrumb;
import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import LogoutButton from '../components/LogoutButton';
import './Home.css';

const Home = () => {   
    const { isLogin, userInfo } = useContext(UserContext);
    let renderLinkUsers = false;
    if (!isLogin || userInfo.isAdmin) renderLinkUsers = true;
    return (
        <div className="Home">
            <Link to="/reports">Reports</Link>
            {renderLinkUsers && <Link to="/users">Users</Link>}
            {isLogin ? (<LogoutButton/>) : (<Link to="/Login">Login</Link>)}
        </div>
    )
};

export default Home;
import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import LogoutButton from '../components/LogoutButton';
import './Home.css';

const Home = (props) => {   
    const { isLogin } = useContext(UserContext);
    return (
        <div className="Home">
            <Link to="/private">Important data</Link>
            {isLogin ? (<LogoutButton/>) : (<Link to="/Login">Login</Link>)}
        </div>
    )
};

export default Home;
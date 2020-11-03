import React from 'react';
import './NavBar.css';

const NavBar = ({ setActiveSideBar }) => {
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
        </div>
    )
};
export default NavBar;
import React, { useState, useEffect, useContext } from 'react';
import List from '../components/users/List';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { API_URL } from '../CommonVar';

const Users = () => {
    const { userInfo } = useContext(UserContext);
    const [users, setUsers] = useState({data: [], countPages: 0});
    const [currPage, setCurrPage] = useState(0);

    const getUsers = (currPage = 0) => {
        fetch(`${API_URL}/api/user/list?page=${currPage}`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setUsers(data);
            setCurrPage(currPage);
        });
    };
    const deleteUser = (e, id) => {
        e.defaultPrevented = true;
        const data = { _id: id };
        fetch(`${API_URL}/api/user/delete`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.,
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(data => getUsers());
    };
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="Users">
            {userInfo.isAdmin ? (<List users={users} currPage={currPage} deleteUser={deleteUser} getUsers={getUsers} />) : (<Redirect to={{pathname: '/'}} />)}
        </div>
    )
};

export default Users;
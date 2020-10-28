import React, { useState, useEffect } from 'react';
import Create from '../components/reports/Create'
import List from '../components/reports/List';
import { API_URL } from '../CommonVar';

const Report = () => {
    const [reports, setReports] = useState({data: [], countPages: 0});
    const [currPage, setCurrPage] = useState(0);
    const [search, setSearch] = useState({ by: '', keyword: '' });

    const getReports = (currPage = 0) => {
        fetch(`${API_URL}/api/report?page=${currPage}&by=${search.by}&keyword=${search.keyword}`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setReports(data);
            setCurrPage(currPage);
        });
        
    };
    const deleteReport = (e, id) => {
        e.defaultPrevented = true;
        const data = { _id: id };
        fetch(`${API_URL}/api/report/`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.,
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(data => getReports(currPage));
    }
    useEffect(() => {
        fetch(`${API_URL}/api/report?page=0`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setReports(data);
        });
    }, []);

    return (
        <div className="Report">
            <Create getReports={getReports} />
            <List reports={reports} currPage={currPage} deleteReport={deleteReport} getReports={getReports} />
        </div>
    )
}

export default Report;
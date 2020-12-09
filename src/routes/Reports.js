import React, { useState, useEffect } from 'react';
import Create from '../components/reports/Create'
import List from '../components/reports/List';
import { API_URL } from '../CommonVar';
import SearchForm from '../components/SearchForm';
import './Reports.css';

const Report = () => {
    const [reports, setReports] = useState({data: [], countPages: 0});
    const [currPage, setCurrPage] = useState(0);
    const [search, setSearch] = useState({ field: '', keyword: '' });
    const [limitPerPage, setLimit] = useState(5);

    const listField = {
        list: ['Họ tên', 'Giới tính', 'Ngày sinh'],
        dic: ['name', 'sex', 'birthday']
    };

    const getReports = () => {
        fetch(`${API_URL}/api/report?page=${currPage}&field=${search.field}&keyword=${search.keyword}&limit=${limitPerPage}`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setReports(data);
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
            .then(data => getReports());
    }
    useEffect(() => {
        fetch(`${API_URL}/api/report?page=${currPage}&field=${search.field}&keyword=${search.keyword}&limit=${limitPerPage}`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setReports(data);
        });
    }, [search, currPage, limitPerPage]);
    console.log('render')
    return (
        <div className="Report">
            <Create getReports={getReports} />
            <SearchForm listField={listField} setSearch={setSearch} setCurrPage={setCurrPage} />
            <List reports={reports} currPage={currPage} deleteReport={deleteReport} setCurrPage={setCurrPage} limitPerPage={limitPerPage} setLimit={setLimit}/>
        </div>
    )
}

export default Report;
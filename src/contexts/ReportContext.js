import React, { useState, createContext, useEffect } from 'react';

export const ReportContext = createContext();
export const ReportProvider = (props) => {
    const [reports, setReports] = useState([]);  
    const getReports = () => {
        fetch('https://api-project1-quocanh.herokuapp.com/api/report/list')
        .then(res => res.json())
        .then(data => {
            setReports(data);
        });
    };
    const deleteReport = (e, id) => {
        e.defaultPrevented = true;
        const data = { id };
        fetch('https://api-project1-quocanh.herokuapp.com/api/report/delete', {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(data => getReports());
    }
    useEffect(() => {
        getReports();
    }, []);  
    
    return (
        <ReportContext.Provider value={{ reports, getReports, deleteReport }}>
            {props.children}
        </ReportContext.Provider>
    )
}
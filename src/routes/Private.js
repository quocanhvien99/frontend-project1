import React from 'react';
import CreateReport from '../components/report/Create';
import ListReport from '../components/report/List';
import './Private.css';

const Private = (props) => {    
    return (
        <div className="Private">
            <CreateReport />
            <ListReport />
        </div>
    )
}
export default Private;
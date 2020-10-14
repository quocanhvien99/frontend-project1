import React from 'react';
import './Spinner.css';

const Spinner = () => {
    return (
        <div className="loader">
			<div className="circle">
				<div className="circle-1"></div>
				<div className="circle-2"></div>
				<div className="circle-3"></div>
			</div>
		</div>
    )
}

export default Spinner;
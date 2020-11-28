import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { API_URL } from '../CommonVar';
import './Statistic.css';

const Statistic = () => {
    const [data, setData] = useState({});
    const [year, setYear] = useState(2020);
    const [isFocus, setFocus] = useState(false);

    let listYear = [];
    for (let key in data) {
        listYear.push(key);
    }

    const handleOnClick = () => {       
        setFocus(!isFocus);
    }
    useEffect(() => {
        fetch(`${API_URL}/api/report/statistic`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(result => {
            setData(result);
        });
    }, [year]);

    return(
        <div className="Statistic">
            <div className="chart-container">                
                <Line 
                    data={{
                        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                        datasets: [{
                            label: 'Tổng số báo cáo',
                            borderColor: 'rgb(255, 99, 132)',
                            data: data[year]
                        }]                        
                    }}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>

            <div className="select-year" onClick={handleOnClick}>
                <span>{year}</span>
                <span className={isFocus?'material-icons icon focus':'material-icons icon'}>keyboard_arrow_down</span>
                <ul className={isFocus?'focus':''}>
                    {
                        listYear.map((item) => <li key={item} onClick={() => setYear(item)}>{item}</li>)
                    }
                </ul>
            </div>
        </div>
    )
};

export default Statistic;
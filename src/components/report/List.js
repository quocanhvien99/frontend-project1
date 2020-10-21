import React, { useContext } from 'react';
import { ReportContext } from '../../contexts/ReportContext';

const List = () => {
    const { reports, deleteReport } = useContext(ReportContext);   

    return (
        <div className="List">
            <table>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Họ tên</th>
                    <th>Giới tính</th>
                    <th>Ngày tạo</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {reports.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index}</td>
                            <td>{item.name}</td>
                            <td>{item.sex}</td>
                            <td>{item.date}</td>
                            <td><button onClick={(e) => deleteReport(e, item._id)}>Xóa</button></td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        </div>
    )
}

export default List;
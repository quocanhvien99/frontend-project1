import React from 'react';
import ReactPaginate from 'react-paginate';
import '../ReactPagination.css';

const List = (props) => {
    const { currPage, reports, deleteReport, getReports } = props; 
    const { data, countPages } = reports;
    const limitPerPage = 10;
    const onPageChangeHandle = ({selected}) => {
        getReports(selected);
    }
    return (
        <div className="List">
            <table>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Họ tên</th>
                    <th>Giới tính</th>
                    <th>Ngày sinh</th>
                    <th>Ngày tạo</th>
                    <th>Nội dung</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + currPage*limitPerPage}</td>
                            <td>{item.name}</td>
                            <td>{item.sex}</td>
                            <td>{item.birthday}</td>
                            <td>{item.date}</td>
                            <td>{item.content}</td>
                            <td><button onClick={(e) => deleteReport(e, item._id)}>Xóa</button></td>
                        </tr>
                    ))} 
                </tbody>
            </table>
            <ReactPaginate pageCount={countPages} pageRangeDisplayed={3} marginPagesDisplayed={2} onPageChange={onPageChangeHandle} containerClassName="pagination"/>
        </div>
    )
}

export default List;
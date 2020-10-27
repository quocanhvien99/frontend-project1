import React from 'react';
import ReactPaginate from 'react-paginate';
import '../ReactPagination.css';

const List = (props) => {
    const { currPage, users, deleteUser, getUsers } = props;   
    const { data, countPages } = users;
    const limitPerPage = 10;
    const onPageChangeHandle = ({selected}) => {
        getUsers(selected);
    }
    return (
        <div className="List">
            <table>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Họ tên</th>
                    <th>Email</th>
                    <th>Ngày tạo</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + currPage*limitPerPage}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.date}</td>
                            <td><button onClick={(e) => deleteUser(e, item._id)}>Xóa</button></td>
                        </tr>
                    ))} 
                </tbody>
            </table>
            <ReactPaginate pageCount={countPages} pageRangeDisplayed={3} marginPagesDisplayed={2} onPageChange={onPageChangeHandle} containerClassName="pagination"/>
        </div>
    )
}

export default List;
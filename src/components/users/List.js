import React from 'react';
import ReactPaginate from 'react-paginate';
import '../ReactPagination.css';

const List = (props) => {
    const { currPage, users, deleteUser, setCurrPage, limitPerPage, setLimit } = props;   
    const { data, countPages } = users;
    const onPageChangeHandle = ({selected}) => {
        setCurrPage(selected);
    }
    const updateLimit = (event) =>{
        setLimit(event.target.value);
        setCurrPage(0);
    };
    const formatDate = (birthday) => {
        birthday = new Date(birthday);
        birthday = birthday.toLocaleDateString();
        return birthday.split('/').join('-');
    }
    return (
        <div className="List">
            <label htmlFor="limit">Số dòng </label>
            <select id="limit" value={limitPerPage} onChange={updateLimit}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
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
                            <td>{formatDate(item.date)}</td>
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
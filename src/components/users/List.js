import React from 'react';
import ReactPaginate from 'react-paginate';
import '../ReactPagination.css';
import '../List.css'

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
            <div className="table-container">
                <table>
                    <colgroup>
                        <col style={{width: '10%'}} />
                        <col style={{width: '30%'}} />
                        <col style={{width: '30%'}} />
                        <col style={{width: '20%'}} />
                        <col style={{width: '10%'}} />
                        </colgroup>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Ngày tạo</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + currPage*limitPerPage}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{formatDate(item.date)}</td>
                                <td>
                                    <span className="material-icons icon" onClick={(e) => deleteUser(e, item._id)}>
                                        delete_outline
                                    </span>
                                </td>
                       
                            </tr>
                        ))} 
                    </tbody>
                </table>
            </div>            
            <ReactPaginate pageCount={countPages} pageRangeDisplayed={3} marginPagesDisplayed={2} onPageChange={onPageChangeHandle} containerClassName="pagination"/>
        </div>
    )
}

export default List;
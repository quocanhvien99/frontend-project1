import React from 'react';
import ReactPaginate from 'react-paginate';
import { API_URL } from '../../apiURL';
import '../ReactPagination.css';
import '../List.css';

const List = (props) => {
	const {
		currPage,
		reports,
		deleteReport,
		setCurrPage,
		limitPerPage,
		setLimit,
	} = props;
	const { data, countPages } = reports;
	const onPageChangeHandle = ({ selected }) => {
		setCurrPage(selected);
	};
	const openReport = (id) => {
		window.open(`${API_URL}/api/report/${id}`);
	};
	const updateLimit = (event) => {
		setLimit(event.target.value);
		setCurrPage(0);
	};
	const formatDate = (birthday) => {
		birthday = new Date(birthday);
		birthday = birthday.toLocaleDateString();
		return birthday.split('/').join('-');
	};

	return (
		<div className="List">
			<select id="limit" value={limitPerPage} onChange={updateLimit}>
				<option value="5">5</option>
				<option value="10">10</option>
				<option value="20">20</option>
				<option value="30">30</option>
			</select>
			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th>STT</th>
							<th>Họ tên</th>
							<th>Giới tính</th>
							<th>Ngày sinh</th>
							<th>Ngày tạo</th>
							<th>Hành động</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item, index) => (
							<tr key={item._id}>
								<td>{index + currPage * limitPerPage}</td>
								<td style={{ textTransform: 'capitalize' }}>{item.name}</td>
								<td style={{ textTransform: 'capitalize' }}>{item.sex}</td>
								<td>{formatDate(item.birthday)}</td>
								<td>{formatDate(item.date)}</td>
								<td>
									<span
										class="material-icons-outlined icon"
										onClick={() => openReport(item._id)}>
										visibility
									</span>
									<span
										className="material-icons icon"
										onClick={(e) => deleteReport(e, item._id)}>
										delete_outline
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<ReactPaginate
				pageCount={countPages}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				onPageChange={onPageChangeHandle}
				containerClassName="pagination"
			/>
		</div>
	);
};

export default List;

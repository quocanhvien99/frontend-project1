import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { API_URL } from '../apiURL';
import Editor from '../components/Editor';
import './Content.css';
import '../components/List.css';

const Content = () => {
	const [isCreateNew, setIsCreateNew] = useState(false);
	const [isEdit, setIsEdit] = useState({ active: false, data: {} });
	const [key, setKey] = useState(0);
	const [content, setContent] = useState({ data: [], countPages: 0 });
	const [currPage, setCurrPage] = useState(0);
	const [limitPerPage, setLimit] = useState(5);

	const getContent = () => {
		fetch(
			`${API_URL}/api/content?page=${currPage}&limit=${limitPerPage}&key=${key}`,
			{
				credentials: 'include',
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setContent(data);
			});
	};
	const deleteContent = (e, id) => {
		const data = { _id: id };
		fetch(`${API_URL}/api/content/`, {
			method: 'DELETE', // *GET, POST, PUT, DELETE, etc.,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		})
			.then((res) => res.json())
			.then((data) => getContent());
	};
	const editContent = (e, data) => {
		setIsEdit({ active: true, data: data });
	};
	useEffect(() => {
		fetch(
			`${API_URL}/api/content?page=${currPage}&limit=${limitPerPage}&key=${key}`,
			{
				credentials: 'include',
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setContent(data);
			});
	}, [key, currPage, limitPerPage, isCreateNew, isEdit]);

	const updateKey = (event) => {
		setCurrPage(0);
		setKey(event.target.value);
	};
	const onPageChangeHandle = ({ selected }) => {
		setCurrPage(selected);
	};

	const dictKey = [
		{ name: 'ĐƯỜNG ĐỜI', key: 0 },
		{ name: 'SỨ MỆNH', key: 1 },
		{ name: 'TRƯỞNG THÀNH', key: 2 },
		{ name: 'CẦU NỐI ĐƯỜNG ĐỜI/SỨ MỆNH', key: 3 },
		{ name: 'SỐ NGÀY SINH', key: 4 },
		{ name: 'KHÁT TÂM', key: 5 },
		{ name: 'NHÂN CÁCH', key: 6 },
		{ name: 'CẦU NỐI KHÁT TÂM/NHÂN CÁCH', key: 7 },
		{ name: 'ĐAM MÊ TIỀM ẨN', key: 8 },
		{ name: 'BÀI HỌC CUỘC SỐNG', key: 9 },
		{ name: 'TIỀM THỨC ẨN', key: 10 },
		{ name: 'SỐ SUY NGHĨ HỢP LÝ', key: 11 },
		{ name: 'SỐ CÂN BẰNG', key: 12 },
		{ name: 'NỀN TẢNG', key: 13 },
		{ name: 'THỂ CHẤT', key: 14 },
		{ name: 'TINH THẦN', key: 15 },
		{ name: 'CẢM XÚC', key: 16 },
		{ name: 'TRỰC GIÁC', key: 17 },
		{ name: 'CHU KỲ 1', key: 18 },
		{ name: 'CHU KỲ 2', key: 19 },
		{ name: 'CHU KỲ 3', key: 20 },
		{ name: 'ĐỈNH CAO 1', key: 21 },
		{ name: 'ĐỈNH CAO 2', key: 22 },
		{ name: 'ĐỈNH CAO 3', key: 23 },
		{ name: 'ĐỈNH CAO 4', key: 24 },
		{ name: 'THÁCH THỨC 1', key: 25 },
		{ name: 'THÁCH THỨC 2', key: 26 },
		{ name: 'THÁCH THỨC 3', key: 27 },
		{ name: 'THÁCH THỨC 4', key: 28 },
		{ name: 'NĂM CÁ NHÂN 2021', key: 29 },
		{ name: 'NĂM CÁ NHÂN 2022', key: 30 },
		{ name: 'NĂM CÁ NHÂN 2023', key: 31 },
	];
	return (
		<div className="Content">
			{!isCreateNew && !isEdit.active ? (
				<div className="list-container">
					<select id="key" onChange={updateKey} value={key}>
						{dictKey.map((item) => (
							<option value={item.key}>{item.name}</option>
						))}
					</select>
					<div className="create-btn" onClick={() => setIsCreateNew(true)}>
						+ Tạo Mới
					</div>
					<div className="List">
						<div className="table-container">
							<table>
								<colgroup>
									<col style={{ width: '20%' }} />
									<col style={{ width: '70%' }} />
									<col style={{ width: '10%' }} />
								</colgroup>
								<thead>
									<tr>
										<th>Số</th>
										<th>Nội dung</th>
										<th>Hành động</th>
									</tr>
								</thead>
								<tbody>
									{content.data.map((item) => (
										<tr key={item._id}>
											<td>{item.number}</td>
											<td className="content">
												<div>{item.content}</div>
											</td>
											<td>
												<span
													className="material-icons-outlined icon"
													onClick={(e) => editContent(e, item)}>
													edit
												</span>
												<span
													className="material-icons icon"
													onClick={(e) => deleteContent(e, item._id)}>
													delete_outline
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<ReactPaginate
						pageCount={content.countPages}
						pageRangeDisplayed={3}
						marginPagesDisplayed={2}
						onPageChange={onPageChangeHandle}
						containerClassName="pagination"
					/>
				</div>
			) : (
				<Editor
					key={key}
					setIsCreateNew={setIsCreateNew}
					isEdit={isEdit}
					setIsEdit={setIsEdit}
				/>
			)}
		</div>
	);
};

export default Content;

import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { API_URL } from '../apiURL';
import Editor from '../components/Editor';
import './Content.css';
import '../components/List.css';

const Content = () => {
	const [isCreateNew, setIsCreateNew] = useState(false);
	const [isEdit, setIsEdit] = useState({ active: false, data: {} });
	const [keyword, setKeyword] = useState('ĐƯỜNG ĐỜI');
	const [content, setContent] = useState({ data: [], countPages: 0 });
	const [currPage, setCurrPage] = useState(0);
	const [limitPerPage, setLimit] = useState(5);

	const getContent = () => {
		fetch(
			`${API_URL}/api/content?page=${currPage}&limit=${limitPerPage}&keyword=${keyword}`,
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
			`${API_URL}/api/content?page=${currPage}&limit=${limitPerPage}&keyword=${keyword}`,
			{
				credentials: 'include',
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setContent(data);
			});
	}, [keyword, currPage, limitPerPage, isCreateNew, isEdit]);

	const updateKey = (event) => {
		setKeyword(event.target.value);
	};
	const onPageChangeHandle = ({ selected }) => {
		setCurrPage(selected);
	};

	const listKey = [
		'ĐƯỜNG ĐỜI',
		'SỨ MỆNH',
		'TRƯỞNG THÀNH',
		'CẦU NỐI ĐƯỜNG ĐỜI/SỨ MỆNH',
		'SỐ NGÀY SINH',
		'KHÁT TÂM',
		'NHÂN CÁCH',
		'CẦU NỐI KHÁT TÂM/NHÂN CÁCH',
		'ĐAM MÊ TIỀM ẨN',
		'BÀI HỌC CUỘC SỐNG',
		'TIỀM THỨC ẨN',
		'SỐ SUY NGHĨ HỢP LÝ',
		'SỐ CÂN BẰNG',
		'NỀN TẢNG',
		'THỂ CHẤT',
		'TINH THẦN',
		'CẢM XÚC',
		'TRỰC GIÁC',
		'CHU KỲ 1',
		'CHU KỲ 2',
		'CHU KỲ 3',
		'ĐỈNH CAO 1',
		'ĐỈNH CAO 2',
		'ĐỈNH CAO 3',
		'ĐỈNH CAO 4',
		'THÁCH THỨC 1',
		'THÁCH THỨC 2',
		'THÁCH THỨC 3',
		'THÁCH THỨC 4',
		'NĂM CÁ NHÂN 2021',
		'NĂM CÁ NHÂN 2022',
		'NĂM CÁ NHÂN 2023',
	];
	return (
		<div className="Content">
			{!isCreateNew && !isEdit.active ? (
				<div className="list-container">
					<select id="key" onChange={updateKey} value={keyword}>
						{listKey.map((item) => (
							<option value={item}>{item}</option>
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
					keyword={keyword}
					setIsCreateNew={setIsCreateNew}
					isEdit={isEdit}
					setIsEdit={setIsEdit}
				/>
			)}
		</div>
	);
};

export default Content;

import React, { useState } from 'react';
import { API_URL } from '../../apiURL';
import Modal from '../Modal';
import './Create.css';

const Create = (props) => {
	const { getReports } = props;
	const [name, setName] = useState('');
	const [birthday, setBirthday] = useState(Date.now());
	const [sex, setSex] = useState('nam');
	const [openForm, setOpenForm] = useState(false);
	const [modalState, setModal] = useState({ isActive: false });
	const [isFetching, setIsFetching] = useState(false);

	const updateName = (event) => {
		setName(event.target.value);
	};
	const updateBirthday = (event) => {
		setBirthday(event.target.value);
	};
	const updateSex = (event) => {
		setSex(event.target.value);
	};
	const submit = (event) => {
		event.defaultValue = true;
		setIsFetching(true);
		const data = { name: name.toLowerCase(), sex, birthday };
		fetch(`${API_URL}/api/report/`, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		}).then(async (res) => {
			setIsFetching(false);
			if (res.status !== 200) {
				const resData = await res.text();
				setModal({ isActive: true, content: resData });
				return;
			}
			getReports();
			setOpenForm(false);
			setName('');
			setBirthday(Date.now());
			setSex('nam');
		});
	};

	return (
		<div className="CreateReport">
			<div className="create-btn" onClick={() => setOpenForm(true)}>
				+ Tạo Mới
			</div>
			<div
				className={openForm ? 'Create-Form Create-Form-Active' : 'Create-Form'}>
				{isFetching ? (
					<div className="container">
						<span className="close-btn" onClick={() => setOpenForm(false)}>
							X
						</span>
						<div class="loading">
							<p>Đang tạo báo cáo</p>
							<p className="dot">.</p>
							<p className="dot">.</p>
							<p className="dot">.</p>
						</div>
					</div>
				) : (
					<div className="container">
						<span className="close-btn" onClick={() => setOpenForm(false)}>
							X
						</span>
						<label htmlFor="name">Họ tên</label>
						<input
							type="text"
							name="name"
							id="name"
							onChange={updateName}
							value={name}
						/>
						<label htmlFor="birthday">Ngày sinh</label>
						<input
							type="date"
							name="birthday"
							id="birthday"
							onChange={updateBirthday}
							value={birthday}
						/>
						<label htmlFor="sex">Giới tính</label>
						<select id="sex" name="sex" defaultValue={sex} onChange={updateSex}>
							<option value="nam">Nam</option>
							<option value="nữ">Nữ</option>
						</select>
						<button onClick={submit}>Tạo báo cáo</button>
					</div>
				)}
			</div>
			<Modal {...modalState} setModel={setModal} />
		</div>
	);
};

export default Create;

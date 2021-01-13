import React, { useState } from 'react';
import { API_URL } from '../../apiURL';
import './Create.css';

const Create = (props) => {
	const { getReports } = props;
	const [name, setName] = useState('');
	const [birthday, setBirthday] = useState(null);
	const [sex, setSex] = useState('nam');
	const [openForm, setOpenForm] = useState(false);

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
		const data = { name: name.toLowerCase(), sex, birthday };
		fetch(`${API_URL}/api/report/`, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		}).then((res) => {
			getReports();
			setOpenForm(false);
			setName('');
			setBirthday(null);
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
				<div className="container">
					<span className="close-btn" onClick={() => setOpenForm(false)}>
						X
					</span>
					<label htmlFor="name">Họ tên</label>
					<input type="text" name="name" id="name" onChange={updateName} />
					<label htmlFor="birthday">Ngày sinh</label>
					<input
						type="date"
						name="birthday"
						id="birthday"
						onChange={updateBirthday}
					/>
					<label htmlFor="sex">Giới tính</label>
					<select id="sex" name="sex" defaultValue={sex} onChange={updateSex}>
						<option value="nam">Nam</option>
						<option value="nữ">Nữ</option>
					</select>
					<button onClick={submit}>Tạo báo cáo</button>
				</div>
			</div>
		</div>
	);
};

export default Create;

import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { API_URL } from '../apiURL';
import './Editor.css';

const Editor = ({ keyword, setIsCreateNew, isEdit, setIsEdit }) => {
	const [number, setNumber] = useState(isEdit.data.number || '');
	const [content, setContent] = useState(isEdit.data.content || '');

	const handleClick = (event) => {
		event.preventDefault();
		if (isEdit.active) {
			const data = { number, content, id: isEdit.data._id };
			fetch(`${API_URL}/api/content`, {
				method: 'PUT',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data), // body data type must match "Content-Type" header
			})
				.then((res) => res.json())
				.then((data) => {
					setIsEdit({ active: false, data: {} });
				});
		} else {
			const data = { number, content, key: keyword };
			fetch(`${API_URL}/api/content`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data), // body data type must match "Content-Type" header
			})
				.then((res) => res.json())
				.then((data) => {
					setIsCreateNew(false);
				});
		}
	};
	const updateNumber = (event) => {
		setNumber(event.target.value);
	};
	const updateContent = (event, editor) => {
		setContent(editor.getData());
	};
	const goBack = () => {
		setIsCreateNew(false);
		setIsEdit({ active: false, data: {} });
	};
	return (
		<div className="Editor">
			<p style={{ cursor: 'pointer' }} onClick={goBack}>
				<span class="material-icons icon">arrow_back</span>
				Quay lại
			</p>
			<input
				type="text"
				id="number"
				placeholder="Nhập con số tương ứng"
				value={number}
				onChange={updateNumber}></input>
			<CKEditor
				editor={ClassicEditor}
				config={{
					toolbar: {
						items: [
							'heading',
							'|',
							'bold',
							'italic',
							'link',
							'bulletedList',
							'numberedList',
							'|',
							'indent',
							'outdent',
							'|',
							'alignment',
							'imageUpload',
							'blockQuote',
							'insertTable',
							'mediaEmbed',
							'undo',
							'redo',
						],
					},
					language: 'vi',
					image: {
						toolbar: [
							'imageTextAlternative',
							'imageStyle:full',
							'imageStyle:side',
						],
					},
					table: {
						contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
					},
				}}
				data={content}
				onChange={updateContent}
			/>
			<button onClick={handleClick}>
				{isEdit.active ? 'Cập nhật' : 'Tạo'}
			</button>
		</div>
	);
};

export default Editor;

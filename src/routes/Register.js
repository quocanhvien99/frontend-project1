import React, {useState} from 'react';
import './Register.css';
import Modal from '../components/Modal';

const Register = ({ history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalState, setModal] = useState({ isActive:false });

    const updateName = (event) => {
        setName(event.target.value);
    };
    const updateEmail = (event) => {
        setEmail(event.target.value);
    };
    const updatePassword = (event) => {
        setPassword(event.target.value);
    };
    const registerHandler = async () => {        
        const data = { name, email, password};
        const res = await fetch('https://api-project1-quocanh.herokuapp.com/api/user/register', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        const resData = await res.text();
        if (res.status === 200) {            
            history.push('/login');
            return;
        }
        setModal({ isActive:true, content: resData });
    };    

    return (
        <div className="Register">
            <h2>Đăng ký</h2>
            <form>
                <label htmlFor="name">Tên</label>
                <input type="text" name="name" id="name" onChange={updateName} value={name}/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={updateEmail} value={email}/>
                <label htmlFor="password">Mật khẩu</label>
                <input type="password" name="password" id="password" onChange={updatePassword} value={password}/>
                <div id="submit-btn" onClick={registerHandler}>Đăng Ký</div>
            </form>
            <Modal {...modalState} setModel={setModal} />
        </div>
    );
}

export default Register;
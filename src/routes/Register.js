import React, {useState} from 'react';
import { NotificationManager } from 'react-notifications';
import './Register.css';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import { API_URL } from '../CommonVar';
import { Link } from 'react-router-dom';

const Register = ({ history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalState, setModal] = useState({ isActive:false });
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);    
        const data = { name, email, password};
        const res = await fetch(`${API_URL}/api/user/register`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        const resData = await res.text();
        setIsLoading(false);
        if (res.status === 200) {            
            history.push('/login');
            NotificationManager.success('Đăng ký thành công!', 'Successful!');
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
                <p>Quay lại trang <Link to="/login">đăng nhập</Link></p>
            </form>
            <Modal {...modalState} setModel={setModal} />
            {isLoading && <Spinner/>}
        </div>
    );
}

export default Register;
import React, {useState, useContext} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import './Login.css';
import Modal from '../components/Modal';

const Login = ({history, location}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalState, setModal] = useState({ isActive:false });
    const { isLogin, setIsLogin } = useContext(UserContext);
    const { from } = location.state || { from: { pathname: "/" } };

    const updateEmail = (event) => {
        setEmail(event.target.value);
    };
    const updatePassword = (event) => {
        setPassword(event.target.value);
    };
    const loginHandler = async () => {        
        const data = { email, password};
        const res = await fetch('https://api-project1-quocanh.herokuapp.com/api/user/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        const resData = await res.text();
        if (res.status === 200) {
            localStorage.setItem('token', resData);
            setIsLogin(!isLogin);
            history.push(from);
            return;
        }
        setModal({ isActive:true, content: resData });
    };
    return isLogin?
    (
        <Redirect to="/" />
    )
    :(
        <div className="login-form">
            <h2>Đăng Nhập</h2>
            <form>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={updateEmail} value={email}/>
                <label htmlFor="password">Mật khẩu</label>
                <input type="password" name="password" id="password" onChange={updatePassword} value={password}/>
                <div id="submit-btn" onClick={loginHandler}>Đăng Nhập</div> 
                <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
            </form>
            <Modal {...modalState} setModel={setModal} />
        </div>
    )
}

export default Login;
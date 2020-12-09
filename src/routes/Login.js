import React, {useState, useContext} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { UserContext } from '../contexts/UserContext';
import { API_URL } from '../CommonVar';
import './Login.css';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import logo from '../logo/google.webp'

const Login = ({history, location}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalState, setModal] = useState({ isActive:false });
    const [isLoading, setIsLoading] = useState(false);
    const { isLogin, setIsLogin } = useContext(UserContext);
    const { from } = location.state || { from: { pathname: "/" } };

    const updateEmail = (event) => {
        setEmail(event.target.value);
    };
    const updatePassword = (event) => {
        setPassword(event.target.value);
    };
    const googleLogin = () => {
        window.open(`${API_URL}/api/auth/google/`, '_self');
    }
    const facebookLogin = () => {
        window.open(`${API_URL}/api/auth/facebook/`, '_self');
    }
    const loginHandler = async () => {  
        setIsLoading(true);      
        const data = { email, password };
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        const resData = await res.text();
        setIsLoading(false);
        if (res.status === 200) {
            setIsLogin(!isLogin);
            history.push(from);
            NotificationManager.success('Đăng nhập thành công!', 'Successful!');
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
                <div id="submit-btn" onClick={loginHandler}>ĐĂNG NHẬP</div>
                <h1>HOẶC</h1>
                <div class="other-login">
                    <div class="google-btn btn" onClick={googleLogin}>
                        <div className="logo">
                            <img src={logo} alt="google-login" />
                        </div>
                        <div>Google</div>
                    </div>
                    <div class="facebook-btn btn" onClick={facebookLogin}>
                        <span className="material-icons icon">facebook</span>
                        <div>Facebook</div>
                    </div>
                </div>
                <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
            </form>
            <Modal {...modalState} setModel={setModal} />
            {isLoading && <Spinner/>}
        </div>
    )
}

export default Login;
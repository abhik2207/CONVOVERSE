import React, { useState } from 'react';
import './Login.css';
import qrCode from './LoginQRcode.png';
import loginLogo from './LoginLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [credentials, setCredentials] = useState({ phoneNumber: '', password: '', profilePic: '' });
    const navigate = useNavigate();

    function onChange(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // const creds = await credentials;
        // console.log(creds);
        const response = await fetch('http://localhost:3005/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phoneNumber: credentials.phoneNumber, password: credentials.password, profilePic: credentials.profilePic })
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse.success) {
            localStorage.setItem('convoverseUserLoginId', jsonResponse.responseData._id);
            localStorage.setItem('convoverseUserLoginName', jsonResponse.responseData.name);
            localStorage.setItem('convoverseUserLoginProfilePic', jsonResponse.responseData.profilePic);
            setCredentials({ phoneNumber: '', password: '', profilePic: '' });
            navigate('/home');
            toast.success(jsonResponse.message, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else {
            toast.error(jsonResponse.message, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return (
        <div className='loginPage'>
            <div className="loginTop">
                <h1>CONVOVERSE</h1>
                <h3>Chat with ease!</h3>
            </div>

            <div className="loginBottom">

            </div>

            <div className="loginCard">
                <div className="cardLeft">
                    <h1>LOG IN</h1>
                    <div className="line"></div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="phoneNumber">Phone Number</label> <br />
                        <input type="text" name="phoneNumber" id="phoneNumber" value={credentials.phoneNumber} onChange={onChange} placeholder='Ex: 989162XXXX' minLength="10" maxLength="12" required /><br />
                        <label htmlFor="password">Password</label> <br />
                        <input type="password" name="password" id="password" value={credentials.password} onChange={onChange} placeholder='Enter your password' minLength="8" maxLength="32" required />
                        <button type='submit' className='loginButton'><img src={loginLogo} alt="Google logo" />Log in</button>
                        <Link to='/signup' className='signupText'>Not a user? Sign up</Link>
                    </form>
                </div>

                <div className="cardRight">
                    <img src={qrCode} alt="QR code" />
                </div>
            </div>
        </div>
    )
}

export default Login;

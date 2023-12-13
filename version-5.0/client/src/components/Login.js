import React, { useState } from 'react';
import './Login.css';
import qrCode from './QR.png';
import loginLogo from './LoginLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Functional component representing the login page
const Login = () => {
    // State to manage user credentials
    const [credentials, setCredentials] = useState({ phoneNumber: '', password: '', profilePic: '' });
    const navigate = useNavigate();

    // Event handler for input changes
    function onChange(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    // Async function to handle form submission
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:3005/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phoneNumber: credentials.phoneNumber, password: credentials.password, profilePic: credentials.profilePic })
        });
        const jsonResponse = await response.json();
        // Handling the response from the server
        if (jsonResponse.success) {
            localStorage.setItem('convoverseUserLoginId', jsonResponse.responseData._id);
            localStorage.setItem('convoverseUserLoginName', jsonResponse.responseData.name);
            localStorage.setItem('convoverseUserLoginProfilePic', jsonResponse.responseData.profilePic);

            // Navigating to home page and setting fields back to empty
            setCredentials({ phoneNumber: '', password: '', profilePic: '' });
            navigate('/home');

            // Displaying a success toast message
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
            // Displaying an error toast message
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

                        {/* Link to navigate to the signup page */}
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

import React, { useState } from 'react';
import './Signup.css';
import qrCode from './LoginQRcode.png';
import signupLogo from './SignupLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
    const [credentials, setCredentials] = useState({ phoneNumber: '', name: '', password: '', profilePic:'' });
    const navigate = useNavigate();

    function onChange(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:3005/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phoneNumber: credentials.phoneNumber, name: credentials.name, password: credentials.password, profilePic: credentials.profilePic })
        });
        const jsonResponse = await response.json();
        setCredentials({ phoneNumber: '', name: '', password: '', profilePic:'' });
        if (jsonResponse.success) {
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
            navigate('/');
        }
        else {
            toast.warning(jsonResponse.responseData[0].message, {
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
        <div className='signupPage'>
            <div className="signupTop">
                <h1>CONVOVERSE</h1>
                <h3>Chat with ease!</h3>
            </div>

            <div className="signupBottom">

            </div>

            <div className="signupCard">
                <div className="cardLeft">
                    <h1>SIGN UP</h1>
                    <div className="line"></div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="phoneNumber">Phone Number</label> <br />
                        <input type="text" name="phoneNumber" id="phoneNumber" value={credentials.phoneNumber} onChange={onChange} placeholder='Ex: 989162XXXX' minLength="10" maxLength="12" required /><br />
                        <label htmlFor="name">Name</label> <br />
                        <input type="text" name="name" id="name" value={credentials.name} onChange={onChange} placeholder='Ex: George Smith' required /><br />
                        <label htmlFor="password">Password</label> <br />
                        <input type="password" name="password" id="password" value={credentials.password} onChange={onChange} placeholder='Must be 8 characters' required /><br />
                        <label htmlFor="profilePic">Profile Pic</label> <br />
                        <input type="text" name="profilePic" id="profilePic" value={credentials.profilePic} onChange={onChange} placeholder='URL to Profile Pic' required />
                        <button type='submit' className='signupButton'><img src={signupLogo} alt="Google logo" />Sign up</button>
                        <Link to='/' className='loginText'>Already a user? Log in</Link>
                    </form>

                </div>

                <div className="cardRight">
                    <img src={qrCode} alt="QR code" />
                </div>
            </div>
        </div>
    )
}

export default Signup;

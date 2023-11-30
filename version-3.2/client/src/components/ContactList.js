import React, { useEffect, useState } from 'react';
import './ContactList.css';
import { ImSearch } from "react-icons/im";
import ContactItem from './ContactItem';
// import { allContacts } from '../mockData';
import { useNavigate } from 'react-router-dom';

const ContactList = (props) => {
    const { setChatPlaceHolder, setSelectedChat } = props;
    const [ userInfo, setUserInfo ] = useState([]);
    const navigate = useNavigate();

    function logoutUser() {
        localStorage.removeItem('convoverseUserLoginId');
        localStorage.removeItem('convoverseUserLoginName');
        localStorage.removeItem('convoverseUserLoginProfilePic');
        navigate('/');
    }

    async function fetchChannels() {
        const loggedInUserId = localStorage.getItem('convoverseUserLoginId');
        const response = await fetch(`http://localhost:3005/channel-list?userId=${loggedInUserId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse.responseData);
        setUserInfo(jsonResponse.responseData);

        // const contacts = jsonResponse.responseData.map(channel => {
        //     if(loggedInUserId === channel.channelUsers[0]._id){
        //         return channel.channelUsers[1];
        //     }
        //     else{
        //         return channel.channelUsers[0];
        //     }
        // });
        // console.log('-- ALL CONTACTS --');
        // console.log(contacts);

        // const messages = jsonResponse.responseData.map(channel => {
        //     const length = channel.messages.length;
        //     return channel.messages[length-1];
        // });
        // console.log('-- ALL MESSAGES --')
        // console.log(messages);

        // const everything = [contacts, messages];
        // console.log('-- EVERYTHING --');
        // console.log(everything);
        // setUserInfo(everything);
    }

    useEffect(() => {
        fetchChannels();
    }, []);

    return (
        <div className='contactListContainer'>
            <div className='contactListHeader'>
                <div className="profileInfo">
                    <div className="profilePic">
                        <img src={localStorage.getItem('convoverseUserLoginProfilePic')} alt='Profile' />
                    </div>
                    <div className="profileName">
                        <p>{localStorage.getItem('convoverseUserLoginName')}</p>
                    </div>
                </div>
                <div className="logoutDiv">
                    <button className="logoutButton" onClick={logoutUser}>Logout</button>
                </div>
            </div>

            <div className="searchDiv">
                <div className="searchLogo">
                    <ImSearch className='ImSearch' />
                </div>
                <div className="searchBox">
                    <input type="text" placeholder='Search or start a new chat' />
                </div>
            </div>

            <div className="listOfContacts">
                {userInfo.map((item) =>
                    <ContactItem key={item._id} userInfo={item} setChatPlaceHolder={setChatPlaceHolder} setSelectedChat={setSelectedChat} />
                )}
            </div>
        </div>
    )
}

export default ContactList;

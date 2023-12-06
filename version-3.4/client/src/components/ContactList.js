import React, { useEffect, useState } from 'react';
import './ContactList.css';
import { ImSearch } from "react-icons/im";
import ContactItem from './ContactItem';
// import { allContacts } from '../mockData';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ContactList = (props) => {
    const { setChatPlaceHolder, setSelectedChat } = props;
    const [userInfo, setUserInfo] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    function logoutUser() {
        localStorage.removeItem('convoverseUserLoginId');
        localStorage.removeItem('convoverseUserLoginName');
        localStorage.removeItem('convoverseUserLoginProfilePic');
        setChatPlaceHolder(true);
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
        console.log('----');
        console.log(jsonResponse.responseData);
        setUserInfo(jsonResponse.responseData);
    }

    function onChange(e) {
        setSearchText(e.target.value);
    }

    async function searchUser() {
        const searchResponse = await fetch(`http://localhost:3005/search-user?phone=${searchText}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const searchResponseJSON = await searchResponse.json();

        if (searchResponseJSON.responseData && searchResponseJSON.responseData._id) {
            const searchResult = searchResponseJSON.responseData;

            const getChannelResponse = await fetch(`http://localhost:3005/channel-list?userId=${localStorage.getItem('convoverseUserLoginId')}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const getChannelResponseJSON = await getChannelResponse.json();

            // Check if the user is already in the channel list
            const existingChannel = getChannelResponseJSON.responseData.find(channel =>
                channel.channelUsers.some(user => user._id === searchResult._id)
            );

            if (!existingChannel) {
                const channelResponse = await fetch('http://localhost:3005/channel', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        channelUsers: [
                            {
                                _id: localStorage.getItem('convoverseUserLoginId'),
                                name: localStorage.getItem('convoverseUserLoginName'),
                                profilePic: localStorage.getItem('convoverseUserLoginProfilePic')
                            },
                            {
                                _id: searchResult._id,
                                name: searchResult.name,
                                profilePic: searchResult.profilePic
                            }
                        ]
                    })
                });
                const channelResponseJSON = await channelResponse.json();
                console.log('Channel');
                console.log(channelResponseJSON.responseData);
            } else {
                toast.info('You already have a chat with this user!', {
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

        else {
            toast.error('Sorry could not find the user :(', {
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

    function onEnterPress(e) {
        if (e.key === "Enter") {
            searchUser();
        }
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
                    <ImSearch className='ImSearch' onClick={searchUser} />
                </div>
                <div className="searchBox">
                    <input type="text" placeholder='Start a new chat by phone number' value={searchText} onChange={onChange} onKeyDown={onEnterPress} />
                </div>
            </div>

            <div className="listOfContacts">
                {/* {
                    searchText==='' ? (
                        userInfo.map((item) =>
                            <ContactItem key={item._id} userInfo={item} setChatPlaceHolder={setChatPlaceHolder} setSelectedChat={setSelectedChat} />
                        )
                    ) : (
                        <ContactItem userInfo={userInfo} setChatPlaceHolder={setChatPlaceHolder} setSelectedChat={setSelectedChat} />
                    )
                } */}
                {userInfo.map((item) =>
                    <ContactItem key={item._id} userInfo={item} setChatPlaceHolder={setChatPlaceHolder} setSelectedChat={setSelectedChat} />
                )}
            </div>
        </div>
    )
}

export default ContactList;

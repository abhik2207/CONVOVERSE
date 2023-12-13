import React, { useEffect, useState } from 'react';
import './ContactList.css';
import { ImSearch } from "react-icons/im";
import ContactItem from './ContactItem';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Functional component representing the list of contacts in the chat application
const ContactList = (props) => {
    // Destructuring props to extract relevant data and functions
    const { setChatPlaceHolder, setSelectedChat } = props;

    // States to manage user information, search text, and navigation
    const [userInfo, setUserInfo] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    // Function to logout the user and navigate to the login page
    function logoutUser() {
        localStorage.removeItem('convoverseUserLoginId');
        localStorage.removeItem('convoverseUserLoginName');
        localStorage.removeItem('convoverseUserLoginProfilePic');
        setChatPlaceHolder(true);

        // Toast notification for successful user logout
        toast.success('User logged out successfully!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

        // Navigating to the login page
        navigate('/');
    }

    // Function to fetch user channels
    async function fetchChannels() {
        const loggedInUserId = localStorage.getItem('convoverseUserLoginId');
        const response = await fetch(`http://localhost:3005/channel-list?userId=${loggedInUserId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const jsonResponse = await response.json();
        setUserInfo(jsonResponse.responseData);
    }

    // Function to refresh user channels
    async function refreshChannels() {
        const loggedInUserId = localStorage.getItem('convoverseUserLoginId');
        const response = await fetch(`http://localhost:3005/channel-list?userId=${loggedInUserId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const jsonResponse = await response.json();
        setUserInfo(jsonResponse.responseData);
        setSearchText('');
    }

    // Event handler for text input change
    function onChange(e) {
        setSearchText(e.target.value);
    }

    // Function to search for a user and initiate a chat
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

            // Fetching user channels
            const getChannelResponse = await fetch(`http://localhost:3005/channel-list?userId=${localStorage.getItem('convoverseUserLoginId')}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const getChannelResponseJSON = await getChannelResponse.json();

            // Checking if a channel already exists with the searched user
            const existingChannel = getChannelResponseJSON.responseData.find(channel =>
                channel.channelUsers.some(user => user._id === searchResult._id)
            );

            // Creating a new channel if it doesn't exist
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

                if(channelResponseJSON){
                    // Toast notification for successful channel creation
                    toast.success('A new chat created successfully!', {
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
                else{
                    // Toast notification for unsuccessful channel creation
                    toast.error('Something went wrong!', {
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
                // Toast notification if a channel already exists with the user
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

            // Refreshing user channels after the operation
            refreshChannels();
        }

        else {
            // Toast notification if the user is not found
            toast.error('Sorry could not find the user!', {
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

    // Event handler for the "Enter" key press
    function onEnterPress(e) {
        if (e.key === "Enter") {
            searchUser();
        }
    }

    // useEffect to fetch user channels on component mount
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
                {/* Mapping through user channels and rendering ContactItem component for each */}
                {userInfo.map((item) =>
                    <ContactItem key={item._id} userInfo={item} setChatPlaceHolder={setChatPlaceHolder} setSelectedChat={setSelectedChat} />
                )}
            </div>
        </div>
    )
}

export default ContactList;

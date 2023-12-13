import React, { useEffect, useState } from 'react';
import './ContactItem.css';
import { FaCheckCircle } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

// Functional component representing a contact item in the chat list
const ContactItem = (props) => {
    // Destructuring props to extract relevant data and functions
    const { userInfo, setChatPlaceHolder, setSelectedChat } = props;

    // State to manage display data for the user
    const [userDisplayData, setUserDisplayData] = useState({ userDisplayPic: '', userDisplayName: '' });

    // States for the last message and its sender indicator
    const [lastMessage, setLastMessage] = useState('');
    const [lastMessageSign, setLastMessageSign] = useState();

    // Function to fetch and set user display data based on the channel users
    function fetchContactData() {
        if (localStorage.getItem('convoverseUserLoginId') === userInfo.channelUsers[0]._id) {
            setUserDisplayData({ userDisplayPic: userInfo.channelUsers[1].profilePic, userDisplayName: userInfo.channelUsers[1].name })
        }
        else {
            setUserDisplayData({ userDisplayPic: userInfo.channelUsers[0].profilePic, userDisplayName: userInfo.channelUsers[0].name })
        }
    }

    // Function to fetch and set the last message and its sender indicator
    function fetchLastMessage() {
        if (userInfo.messages.length > 0) {
            const length = userInfo.messages.length;
            const lastMsg = userInfo.messages[length - 1];
            if (lastMsg.senderID === localStorage.getItem('convoverseUserLoginId')) {
                setLastMessageSign(0);
            }
            else {
                setLastMessageSign(1);
            }
            const lastMsgText = lastMsg.message.slice(0, 40);
            setLastMessage(lastMsgText);
        }
    }

    // useEffect to fetch user display data and the initial last message on component mount
    useEffect(() => {
        fetchContactData();
        fetchLastMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect to update the last message when there's a change in userInfo.messages
    useEffect(() => {
        fetchLastMessage();
        console.log('hello');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo.messages]);

    return (
        <div className='contactItemContainer' onClick={() => {
            setChatPlaceHolder(false);
            setSelectedChat(userInfo);
        }}>
            <div className="leftSection">
                <div className="chatDP">
                    <img src={userDisplayData.userDisplayPic} alt="DP" />
                </div>
                <div className="chatContent">
                    <h1 className='contactName'>{userDisplayData.userDisplayName}</h1>
                    <p className='lastText'>{lastMessage}</p>
                </div>
            </div>
            <div className="rightSection">
                {/* Conditional rendering based on the lastMessageSign */}
                {lastMessageSign === 0 ? <p className='sentSign'><FaCheckCircle /></p> : <p className='recievedSign'><FaEnvelope /></p>}
            </div>
        </div>
    )
}

export default ContactItem;
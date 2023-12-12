import React, { useEffect, useState } from 'react';
import './ContactItem.css';
import { FaCheckCircle } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

const ContactItem = (props) => {
    const { userInfo, setChatPlaceHolder, setSelectedChat } = props;
    const [userDisplayData, setUserDisplayData] = useState({ userDisplayPic: '', userDisplayName: '' });
    const [lastMessage, setLastMessage] = useState('');
    const [lastMessageSign, setLastMessageSign] = useState();

    function fetchContactData() {
        if (localStorage.getItem('convoverseUserLoginId') === userInfo.channelUsers[0]._id) {
            setUserDisplayData({ userDisplayPic: userInfo.channelUsers[1].profilePic, userDisplayName: userInfo.channelUsers[1].name })
        }
        else {
            setUserDisplayData({ userDisplayPic: userInfo.channelUsers[0].profilePic, userDisplayName: userInfo.channelUsers[0].name })
        }
    }

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

    useEffect(() => {
        fetchContactData();
        fetchLastMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                {lastMessageSign === 0 ? <p className='sentSign'><FaCheckCircle /></p> : <p className='recievedSign'><FaEnvelope /></p>}
            </div>
        </div>
    )
}

export default ContactItem;
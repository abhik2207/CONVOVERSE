import React, { useEffect, useState } from 'react';
import './ContactItem.css';

const ContactItem = (props) => {
    const { userInfo, setChatPlaceHolder, setSelectedChat } = props;
    const [userDisplayData, setUserDisplayData] = useState({ userDisplayPic: '', userDisplayName: '' });
    const [lastMessage, setLastMessage] = useState('');

    function fetchContactData() {
        if (localStorage.getItem('convoverseUserLoginId') === userInfo.channelUsers[0]._id) {
            setUserDisplayData({ userDisplayPic: userInfo.channelUsers[1].profilePic, userDisplayName: userInfo.channelUsers[1].name })
        }
        else {
            setUserDisplayData({ userDisplayPic: userInfo.channelUsers[0].profilePic, userDisplayName: userInfo.channelUsers[0].name })
        }
    }

    function fetchLastMessage() {
        if(userInfo.messages.length === 0) {
            setLastMessage('');
        }
        else {
            const length = userInfo.messages.length;
            setLastMessage(userInfo.messages[length - 1].message);
        }
    }

    useEffect(() => {
        fetchContactData();
        fetchLastMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    // useEffect(()=>{
    //     fetchLastMessage();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userInfo]);

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
                <p>10pm</p>
            </div>
        </div>
    )
}

export default ContactItem;
import React from 'react';
import './ContactItem.css';

const ContactItem = (props) => {
    const { userInfo, setChatPlaceHolder, setSelectedChat } = props;
    return (
        <div className='contactItemContainer' onClick={()=>{
            setChatPlaceHolder(false);
            setSelectedChat(userInfo);
        }}>
            <div className="leftSection">
                <div className="chatDP">
                    <img src={userInfo.displayImageURL} alt="DP" />
                </div>
                <div className="chatContent">
                    <h1 className='contactName'>{userInfo.contactName}</h1>
                    <p className='lastText'>{userInfo.lastChat}</p>
                </div>
            </div>
            <div className="rightSection">
                <p>{userInfo.messageTime}</p>
            </div>
        </div>
    )
}

export default ContactItem;
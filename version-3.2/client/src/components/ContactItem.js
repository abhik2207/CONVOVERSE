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
                    <img src={userInfo.profilePic} alt="DP" />
                </div>
                <div className="chatContent">
                    <h1 className='contactName'>{userInfo.name}</h1>
                    {/* <p className='lastText'>{userInfo.lastChat}</p> */}
                    <p className='lastText'>xxx</p>
                </div>
            </div>
            <div className="rightSection">
                {/* <p>{userInfo.messageTime}</p> */}
                <p>10pm</p>
            </div>
        </div>
    )
}

export default ContactItem;
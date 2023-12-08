import React from 'react';
import './ChatSectionPlaceholder.css';
import placeholderImage from './ChatSectionPlaceholderImage.png';

const ChatSectionPlaceholder = () => {
    return (
        <div className='placeholderContainer'>
            <img src={placeholderImage} alt="Placeholder" />
            <h1>Keep your phone connected</h1>
            <p>Whatsapp connects to your phone to sync messages<br></br>and provide you a seamless experience</p>
        </div>
    )
}

export default ChatSectionPlaceholder;

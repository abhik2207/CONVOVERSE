import React from 'react';
import './ChatSectionPlaceholder.css';
import placeholderImage from './ChatSectionPlaceholderImage.png';

// Functional component for displaying a placeholder in the chat section
const ChatSectionPlaceholder = () => {
    return (
        <div className='placeholderContainer'>
            <div className="imageDiv">
                <img src={placeholderImage} alt="Placeholder" />
            </div>
            <h1>Welcome to Convoverse!</h1>
            <p>Whatsapp connects to your phone to sync messages<br></br>and provide you a seamless experience</p>
        </div>
    )
}

export default ChatSectionPlaceholder;

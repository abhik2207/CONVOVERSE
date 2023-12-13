import React from 'react';
import './Message.css';

// Functional component representing a chat message
const Message = (props) => {
    // Destructuring props to extract message content and sender information
    const { messageContent, senderIsMe } = props;

    // Conditional rendering based on whether the message is sent by the user or received from others
    if(senderIsMe){
        return (
            <div className='sentMessageDiv'>
                <div className="sentMessage msg">
                    {messageContent}
                </div>
            </div>
        )
    }
    else{
        return (
            <div className='receivedMessageDiv'>
                <div className="receivedMessage msg">
                    {messageContent}
                </div>
            </div>
        )
    }
    
}

export default Message;

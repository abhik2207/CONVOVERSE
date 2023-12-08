import React from 'react';
import './Message.css';

const Message = (props) => {
    const { messageContent, senderIsMe } = props;

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

import React, { useState } from 'react';
import './Conversation.css';
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { AiOutlineSend } from "react-icons/ai";
import Message from './Message';
import { allMessages } from '../mockData';
import EmojiPicker from 'emoji-picker-react';
import ConversationWallpaper from './ConversationWallpaper.jpg';

const Conversation = (props) => {
    const { selectedChat } = props;
    const [ messageText, setMessageText ] = useState('');
    const [ pickerVisible, setPickerVisible ] = useState(false);
    const [ messageList, setMessageList ] = useState(allMessages);

    function handleChange(e) {
        setMessageText(e.target.value);
    }

    function onEmojiClick(emojiObject) {
        let emoji = emojiObject.emoji;
        console.log(messageText);
        console.log(emoji);
        setMessageText(messageText => messageText + emoji);
        // setPickerVisible(false);
    }

    function toggleEmojiPicker() {
        setPickerVisible(!pickerVisible);
    }

    function sendMessage() {
        const currentMessages = [...messageList];
        if(messageText !== ''){
            currentMessages.push({
                id: 0,
                messageType: "TEXT",
                messageContent: messageText,
                senderIsMe: true,
                sentOn: "00:00 PM",
            });
            setMessageList(currentMessages);
            setMessageText('');
        }   
    }

    function onEnterPress(e) {
        if(e.key === "Enter"){
            sendMessage();
        }
    }

    const conversationWallpaperStyling = {
        backgroundImage: `url(${ConversationWallpaper})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
    }

    return (
        <div className='conversationContainer'>
            <div className="conversationHeader">
                <div className="chatPerson">
                    <div className="personDP">
                        <img src={localStorage.getItem('convoverseUserLoginProfilePic')} alt="PERSON DP" />
                    </div>
                    <div className="personName">
                        <p>{localStorage.getItem('convoverseUserLoginName')}</p>
                    </div>
                </div>
            </div>

            <div className="chatSection" style={conversationWallpaperStyling}>
                {messageList.map((msg) =>
                    <Message key={msg.id} messageContent={msg.messageContent} senderIsMe={msg.senderIsMe} />
                )}
            </div>

            <div className="sendMessageDiv">
                <div className="emojiLogo">
                    <div className='emojiContainer'>
                        {pickerVisible && <EmojiPicker height={500} width={400} onEmojiClick={onEmojiClick} />}
                    </div>
                    <HiOutlineEmojiHappy className='HiOutlineEmojiHappy' onClick={toggleEmojiPicker} />
                </div>
                <div className="messageInput">
                    <input type="text" placeholder="Type a message" onKeyDown={onEnterPress} value={messageText} onChange={handleChange} />
                </div>
                <div className="sendLogo">
                    <AiOutlineSend className='AiOutlineSend' onClick={sendMessage} />
                </div>
            </div>
        </div>
    )
}

export default Conversation;

import React, { useEffect, useState } from 'react';
import './Conversation.css';
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { AiOutlineSend } from "react-icons/ai";
import Message from './Message';
import EmojiPicker from 'emoji-picker-react';
import ConversationWallpaper from './ConversationWallpaper.jpg';

// Functional component representing a conversation in the chat application
const Conversation = (props) => {
    // Destructuring props to extract relevant data
    const { selectedChat } = props;

    // States to manage message input, emoji picker visibility, message list, and active user data
    const [messageText, setMessageText] = useState('');
    const [pickerVisible, setPickerVisible] = useState(false);
    const [messageList, setMessageList] = useState([]);
    const [activeUserData, setActiveUserData] = useState({ activeUserName: '', activeUserProfilePic: '' });

    // Event handler for handling changes in the message input
    function handleChange(e) {
        setMessageText(e.target.value);
    }

    // Event handler for emoji click in the emoji picker
    function onEmojiClick(emojiObject) {
        let emoji = emojiObject.emoji;
        console.log(messageText);
        console.log(emoji);
        setMessageText(messageText => messageText + emoji);
        // setPickerVisible(false);
    }

    // Function to toggle visibility of the emoji picker
    function toggleEmojiPicker() {
        setPickerVisible(!pickerVisible);
    }

    // Function to refresh messages in the current conversation
    async function refreshMessages() {
        const loggedInUserID = localStorage.getItem('convoverseUserLoginId');
        const newResponse = await fetch(`http://localhost:3005/channel-list?userId=${loggedInUserID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const newResponseJSON = await newResponse.json();
        const requiredChat = newResponseJSON.responseData.filter((item) => item._id === selectedChat._id);
        setMessageList(requiredChat[0].messages);
    }

    // Function to send a message
    async function sendMessage() {
        if (messageText !== '') {
            await fetch('http://localhost:3005/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    channelId: selectedChat._id, messages: {
                        senderID: localStorage.getItem('convoverseUserLoginId'),
                        message: messageText
                    }
                })
            });
            setMessageText('');
            setPickerVisible(false);
            if (selectedChat.messages.length !== 0) {
                refreshMessages();
            }
        }
    }

    // Event handler for the "Enter" key press
    function onEnterPress(e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    }

    // Function to fetch active user data for the conversation
    function fetchActiveUserData() {
        if (localStorage.getItem('convoverseUserLoginId') === selectedChat.channelUsers[0]._id) {
            setActiveUserData({ activeUserName: selectedChat.channelUsers[1].name, activeUserProfilePic: selectedChat.channelUsers[1].profilePic });
        }
        else {
            setActiveUserData({ activeUserName: selectedChat.channelUsers[0].name, activeUserProfilePic: selectedChat.channelUsers[0].profilePic });
        }
    }

    // Function to fetch all messages in the conversation
    function fetchAllMessages() {
        const allMessages = selectedChat.messages;
        setMessageList(allMessages);
    }

    // useEffect to fetch active user data and all messages on component mount and when the selectedChat changes
    useEffect(() => {
        fetchActiveUserData();
        fetchAllMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedChat]);

    // useEffect to refresh messages when the messageList changes
    useEffect(() => {
        refreshMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageList]);

    // Styling for the conversation wallpaper
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
                        <img src={activeUserData.activeUserProfilePic} alt="PERSON DP" />
                    </div>
                    <div className="personName">
                        <p>{activeUserData.activeUserName}</p>
                    </div>
                </div>
            </div>

            <div className="chatSection" style={conversationWallpaperStyling}>
                {/* Mapping through messages and rendering Message component for each */}
                {messageList.map((msg) =>
                    <Message key={msg._id} messageContent={msg.message} senderIsMe={msg.senderID === localStorage.getItem('convoverseUserLoginId')} />
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

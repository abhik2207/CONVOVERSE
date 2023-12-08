import React, { useEffect, useState } from 'react';
import './Conversation.css';
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { AiOutlineSend } from "react-icons/ai";
import Message from './Message';
import EmojiPicker from 'emoji-picker-react';
import ConversationWallpaper from './ConversationWallpaper.jpg';

const Conversation = (props) => {
    const { selectedChat } = props;
    const [messageText, setMessageText] = useState('');
    const [pickerVisible, setPickerVisible] = useState(false);
    const [messageList, setMessageList] = useState([]);
    const [activeUserData, setActiveUserData] = useState({ activeUserName: '', activeUserProfilePic: '' });

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

    function onEnterPress(e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    }

    function fetchActiveUserData() {
        if (localStorage.getItem('convoverseUserLoginId') === selectedChat.channelUsers[0]._id) {
            setActiveUserData({ activeUserName: selectedChat.channelUsers[1].name, activeUserProfilePic: selectedChat.channelUsers[1].profilePic });
        }
        else {
            setActiveUserData({ activeUserName: selectedChat.channelUsers[0].name, activeUserProfilePic: selectedChat.channelUsers[0].profilePic });
        }
    }

    function fetchAllMessages() {
        const allMessages = selectedChat.messages;
        setMessageList(allMessages);
    }

    useEffect(() => {
        fetchActiveUserData();
        fetchAllMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedChat]);

    useEffect(() => {
        refreshMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageList]);


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
                {
                    messageList.map((msg) =>
                        <Message key={msg._id} messageContent={msg.message} senderIsMe={msg.senderID === localStorage.getItem('convoverseUserLoginId')} />
                    )
                }
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

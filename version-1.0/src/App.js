import React, { useState } from 'react';
import './App.css';
import ContactList from './components/ContactList';
import Conversation from './components/Conversation';
import ChatSectionPlaceholder from './components/ChatSectionPlaceholder';
// import styled from 'styled-components';

const App = () => {
  const [chatPlaceHolder, setChatPlaceHolder] = useState(true);
  const [selectedChat, setSelectedChat] = useState();

  return (
    <div className='app'>
      <ContactList setChatPlaceHolder={setChatPlaceHolder} setSelectedChat={setSelectedChat} />
      {chatPlaceHolder ? (<ChatSectionPlaceholder />) : (<Conversation selectedChat={selectedChat} />) }
      {/* <Conversation /> */}
    </div>
  )
}

export default App;

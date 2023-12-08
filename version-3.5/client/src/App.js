import React, { useState } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import styled from 'styled-components';
import ContactList from './components/ContactList';
import Conversation from './components/Conversation';
import ChatSectionPlaceholder from './components/ChatSectionPlaceholder';
import Login from './components/Login';
import Signup from './components/Signup';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  const [ chatPlaceHolder, setChatPlaceHolder ] = useState(true);
  const [ selectedChat, setSelectedChat ] = useState();
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={
          <div className='app'>
            <ContactList setChatPlaceHolder={setChatPlaceHolder} setSelectedChat={setSelectedChat} />
            {chatPlaceHolder ? (<ChatSectionPlaceholder />) : (<Conversation selectedChat={selectedChat} />)}
            {/* <Conversation /> */}
          </div>} />
      </Routes>
      <ToastContainer />
    </>

  )
}

export default App;

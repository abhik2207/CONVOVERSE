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

// Main App component
const App = () => {
  // State to manage the display of ChatSectionPlaceholder and selected chat
  const [ chatPlaceHolder, setChatPlaceHolder ] = useState(true);
  const [ selectedChat, setSelectedChat ] = useState();
  
  return (
    <>
      <Routes>
        {/* Route for the login page */}
        <Route path='/' element={<Login />} />

        {/* Route for the signup page */}
        <Route path='/signup' element={<Signup />} />

        {/* Route for the home page */}
        <Route path='/home' element={
          <div className='app'>
            {/* ContactList component */}
            <ContactList setChatPlaceHolder={setChatPlaceHolder} setSelectedChat={setSelectedChat} />

            {/* Conditional rendering based on 'chatPlaceHolder' state */}
            {chatPlaceHolder ? (<ChatSectionPlaceholder />) : (<Conversation selectedChat={selectedChat} />)}
          </div>
        } />
      </Routes>
      <ToastContainer />
    </>

  )
}

export default App;

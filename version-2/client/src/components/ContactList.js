import React from 'react';
import './ContactList.css';
import { ImSearch } from "react-icons/im";
import ContactItem from './ContactItem';
import { allContacts } from '../mockData';

const ContactList = (props) => {
    const { setChatPlaceHolder, setSelectedChat } = props;
    return (
        <div className='contactListContainer'>
            <div className='contactListHeader'>
                <div className="profileInfo">
                    <div className="profilePic">
                        <img src="https://images.unsplash.com/photo-1539125530496-3ca408f9c2d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" alt='Profile' />
                    </div>
                    <div className="profileName">
                        <p>Abhik Gupta</p>
                    </div>
                </div>
            </div>

            <div className="searchDiv">
                <div className="searchLogo">
                    <ImSearch className='ImSearch' />
                </div>
                <div className="searchBox">
                    <input type="text" placeholder='Search or start a new chat' />
                </div>
            </div>

            <div className="listOfContacts">
                {allContacts.map((contact) =>
                    <ContactItem key={contact.id} userInfo={contact} setChatPlaceHolder={setChatPlaceHolder} setSelectedChat={setSelectedChat} />
                )}
            </div>
        </div>
    )
}

export default ContactList;

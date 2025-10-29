import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BottomBar from '../components/BottomBar';
import '../styles/whispers.css';

const initialChats = [
  { user: 'ShadowDragon', message: 'Hey! Are you live now? ', time: '2m ago', avatar: 'avatar1.png' },
  { user: 'PixelVibe', message: 'Let’s stream tonight 👾', time: '2m ago', avatar: 'avatar2.png' },
  { user: 'LunaCraft', message: 'You missed the raid 😭', time: '2m ago', avatar: 'avatar3.png' },
];

const ChatItem = ({ user, message, time, avatar }) => {
  const handleChatClick = () => {
    alert(`Opening chat with ${user}:\n"${message}"`);
  };

  return (
    <div className="chat-item" onClick={handleChatClick}>
      <img src={avatar} alt="User" className="avatar" />
      <div className="chat-info">
        <h4>@{user}</h4>
        <p>{message}</p>
        <span className="chat-time">{time}</span>
      </div>
    </div>
  );
};

const WhispersPage = () => {
  const [activeTab, setActiveTab] = useState('whispers');

  return (
    <div className="whispers-page">
      <h4 className="page-title">Activity</h4>
      <div className="header-buttons">
        <Link 
          to="/activity" 
          className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </Link>
        <Link 
          to="/whispers" 
          className={`tab ${activeTab === 'whispers' ? 'active' : ''}`}
          onClick={() => setActiveTab('whispers')}
        >
          Whispers
        </Link>
      </div>

      <section className="chat-list">
        {initialChats.map((chat, index) => (
          <ChatItem key={index} {...chat} />
        ))}
      </section>
      
      <BottomBar />
    </div>
  );
};

export default WhispersPage;
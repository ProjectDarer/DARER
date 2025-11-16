import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import BottomBar from '../components/BottomBar';
import '../styles/whispers.css';

const initialChats = [
  { user: 'ShadowDragon', message: 'Hey! Are you live now? ', time: '2m ago', avatar: 'avatar1.png' },
  { user: 'PixelVibe', message: 'Let’s stream tonight 👾', time: '2m ago', avatar: 'avatar2.png' },
  { user: 'LunaCraft', message: 'You missed the raid 😭', time: '2m ago', avatar: 'avatar3.png' },
  { user: 'CyberNinja', message: 'Raid at 10 EST?', time: '1h ago', avatar: 'avatar4.png' },
  { user: 'DareBot', message: 'Your dare has been completed!', time: '5h ago', avatar: 'avatar5.png' },
];

const ChatItem = ({ user, message, time, avatar }) => {
  const handleChatClick = () => {
    alert(`Opening chat with ${user}:\n"${message}"`);
  };

  return (
    <div className="chat-item" onClick={handleChatClick}>
      {/* Assuming avatars are in public folder or fetched dynamically */}
      <img src={avatar} alt="User" className="avatar" /> 
      <div className="chat-info">
        <h4>@{user}</h4>
        <p>{message}</p>
      </div>
      <span className="chat-time">{time}</span>
    </div>
  );
};

const WhispersPage = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredChats, setFilteredChats] = useState(initialChats);
  
  // NavLink active class helper
  const isTabActive = ({ isActive }) => isActive ? 'tab active' : 'tab';

  // Live search functionality
  useEffect(() => {
    const lowerCaseSearch = searchText.toLowerCase();
    const filtered = initialChats.filter(chat =>
      chat.user.toLowerCase().includes(lowerCaseSearch) ||
      chat.message.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredChats(filtered);
  }, [searchText]);


  return (
    <div className="whispers-page">
      <h4 className="page-title">Activity</h4>
      
      <div className="header-buttons">
        <NavLink 
          to="/activity" 
          className={isTabActive}
        >
          Notifications
        </NavLink>
        <NavLink 
          to="/whispers" 
          className={isTabActive}
        >
          Whispers
        </NavLink>
      </div>
      
      {/* NEW Search Input Section */}
      <div className="whispers-header">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search whispers..." 
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <section className="chat-list">
        {filteredChats.length > 0 ? (
            filteredChats.map((chat, index) => (
                <ChatItem key={index} {...chat} />
            ))
        ) : (
            <p style={{ textAlign: 'center', color: '#fffc00', marginTop: '30px' }}>No whispers found for "{searchText}"</p>
        )}
      </section>
      
      <BottomBar />
    </div>
  );
};

export default WhispersPage;
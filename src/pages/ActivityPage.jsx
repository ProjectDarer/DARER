import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import BottomBar from '../components/BottomBar';
import '../styles/activity.css'; 

// Initial hardcoded activities from activity.html
const initialActivities = [
  { user: 'StreamerOne', action: 'went live', detail: 'Valorant Gameplay', time: '5 min ago', avatar: 'avatar1.jpg' },
  { user: 'CoolGamer', action: 'uploaded a new video', detail: '', time: '20 min ago', avatar: 'avatar2.jpg' },
  { user: 'StreamerOne', action: 'went live', detail: 'Valorant Gameplay', time: '5 min ago', avatar: 'avatar1.jpg' },
  { user: 'StreamerOne', action: 'went live', detail: 'Valorant Gameplay', time: '5 min ago', avatar: 'avatar1.jpg' },
  { user: 'StreamerOne', action: 'went live', detail: 'Valorant Gameplay', time: '5 min ago', avatar: 'avatar1.jpg' },
  { user: 'StreamerOne', action: 'went live', detail: 'Valorant Gameplay', time: '5 min ago', avatar: 'avatar1.jpg' },
  { user: 'StreamerOne', action: 'went live', detail: 'Valorant Gameplay', time: '5 min ago', avatar: 'avatar1.jpg' },
];

// Extracted ActivityItem component
const ActivityItem = ({ activity, readOpacity }) => (
  <div className="activity-item" style={{ opacity: readOpacity }}>
    <img src={activity.avatar} alt="Avatar" className="avatar" />
    <div className="message">
      <p>
        <strong className="str">@{activity.user}</strong> {activity.action}: <span>{activity.detail}</span>
      </p>
      <span className="time">{activity.time}</span>
    </div>
  </div>
);

const ActivityPage = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [readOpacity, setReadOpacity] = useState(1);

  // Function to simulate adding a new activity (runs every 10 seconds)
  const addNewActivity = useCallback(() => {
    // Standardize time for new activities
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const newActivity = { 
      user: 'NewStreamer', 
      action: 'started streaming', 
      detail: 'Minecraft Adventure', 
      time: `Now - ${now}`, 
      avatar: 'avatar1.jpg' 
    };
    // Add the new item at the top of the array
    setActivities(prevActivities => [newActivity, ...prevActivities]);
  }, []);

  // Replaces the setInterval from public/javascripts/activity.js
  useEffect(() => {
    const interval = setInterval(addNewActivity, 10000); // Add new activity every 10 seconds
    return () => clearInterval(interval);
  }, [addNewActivity]);

  // Replaces the "Mark as Read" click logic
  const handleMarkRead = () => {
    // Toggles opacity for visual effect
    setReadOpacity(prev => prev === 1 ? 0.5 : 1);
  };

  // NavLink active class helper
  const isTabActive = ({ isActive }) => isActive ? 'tab active' : 'tab';


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
      
      {/* Mark Controls */}
      <div className="mark-controls">
        <p>You have {activities.length} unread notifications</p>
        <button className="mark-read" onClick={handleMarkRead}>Mark all as Read</button>
      </div>

      <section className="activity-feed">
        {activities.map((activity, index) => (
          <ActivityItem key={index} activity={activity} readOpacity={readOpacity} />
        ))}
      </section>

      <BottomBar />
    </div>
  );
};

export default ActivityPage;
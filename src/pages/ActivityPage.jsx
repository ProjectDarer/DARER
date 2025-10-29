import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import BottomBar from '../components/BottomBar';
import '../styles/activity.css'; 
// NOTE: Assuming you merge layout.css content into global.css or activity.css if it's purely for layout

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

const ActivityPage = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [activeTab, setActiveTab] = useState('notifications'); // 'notifications' or 'whispers'
  const [readOpacity, setReadOpacity] = useState(1);

  // Function to simulate adding a new activity (from public/javascripts/activity.js setInterval)
  const addNewActivity = useCallback(() => {
    const now = new Date().toLocaleTimeString();
    const newActivity = { 
      user: 'NewStreamer', 
      action: 'started streaming', 
      detail: 'Minecraft Adventure', 
      time: now, 
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
    setReadOpacity(0.5);
  };

  const ActivityItem = ({ activity }) => (
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
      
      {/* Mark Controls - Not in original HTML, but good for UX */}
      <div className="mark-controls">
        <p>You have {activities.length} unread notifications</p>
        <button className="mark-read" onClick={handleMarkRead}>Mark all as Read</button>
      </div>

      <section className="activity-feed">
        {activities.map((activity, index) => (
          <ActivityItem key={index} activity={activity} />
        ))}
      </section>

      <BottomBar />
    </div>
  );
};

export default ActivityPage;
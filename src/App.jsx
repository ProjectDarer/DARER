import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import ErrorPage from './pages/ErrorPage';
import PlayerLoadingPage from './pages/PlayerLoadingPage';
import PlayerSignupPage from './pages/PlayerSignupPage';
import WatcherSignupPage from './pages/WatcherSignupPage';
import ActivityPage from './pages/ActivityPage';
import WhispersPage from './pages/WhispersPage';
import LiveChannelPage from './pages/LiveChannelPage';
import HomePage from './pages/HomePage';
import FollowingPage from './pages/FollowingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

// You will likely have more global CSS, you can import it here
// import './styles/layout.css'; 
// import './styles/index.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/whispers" element={<WhispersPage />} />
        <Route path="/live_channel" element={<LiveChannelPage />} />
        <Route path="/following" element={<FollowingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* Player Flow */}
        <Route path="/html/circle.html" element={<PlayerLoadingPage />} />
        <Route path="/html/player_signup.html" element={<PlayerSignupPage />} />
        {/* Watcher Flow */}
        <Route path="/html/watcher_signup.html" element={<WatcherSignupPage />} />
        {/* Error */}
        <Route path="/error" element={<ErrorPage />} />
        {/* Fallback route */}
        <Route path="*" element={<ErrorPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
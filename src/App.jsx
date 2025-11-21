// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';

// Core Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ErrorPage from './pages/ErrorPage';

// NEW Dashboard Pages
import DashboardPage from './pages/DashboardPage';
import DaresPage from './pages/DaresPage';
import StreamPage from './pages/StreamPage';
import SettingPage from './pages/SettingPage';
import OnboardingPage from './pages/OnboardingPage';
// FIX: Add missing imports for pages linked in AppLayout
import WalletPage from './pages/WalletPage'; 
import LeaderboardPage from './pages/LeaderboardPage'; 

// STUBS 
import PlayerLoadingPage from './pages/PlayerLoadingPage';
import PlayerSignupPage from './pages/PlayerSignupPage';
import WatcherSignupPage from './pages/WatcherSignupPage';


function App() {
  return (
    <Router>
      <Routes>
        
        {/* ======================================= */}
        {/* FULL-PAGE ROUTES (NO SIDEBAR)           */}
        {/* ======================================= */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Legacy/External Flow Stubs (Also typically full-page) */}
        <Route path="/html/circle.html" element={<PlayerLoadingPage />} />
        <Route path="/html/player_signup.html" element={<PlayerSignupPage />} />
        <Route path="/html/watcher_signup.html" element={<WatcherSignupPage />} />
        
        {/* ======================================= */}
        {/* LAYOUT ROUTE (PAGES WITH SIDEBAR)       */}
        {/* ======================================= */}
        {/* The 'element' prop here renders the AppLayout component, and the nested <Route> elements are rendered as its 'children'. */}
        <Route element={<AppLayout />}> 
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/home" element={<DashboardPage />} /> 
          <Route path="/dares" element={<DaresPage />} />
          <Route path="/stream" element={<StreamPage />} />
          {/* FIX: Added Wallet and Leaderboard routes */}
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          {/* Note: Keeping /Setting (capital S) to match link in AppLayout.jsx */}
          <Route path="/Setting" element={<SettingPage />} /> 
          <Route path="/profile" element={<SettingPage />} /> 
        </Route>

        {/* System Routes */}
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
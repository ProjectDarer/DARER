import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';

// Core Pages (Keep)
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ErrorPage from './pages/ErrorPage';

// NEW Dashboard Pages
import DashboardPage from './pages/DashboardPage'; // Renamed from NewDashboardPage
import DaresPage from './pages/DaresPage';
import StreamPage from './pages/StreamPage';
import SettingPage from './pages/SettingPage';
import OnboardingPage from './pages/OnboardingPage';

// STUBS (To prevent import errors in any remaining files that might reference them)
import PlayerLoadingPage from './pages/PlayerLoadingPage';
import PlayerSignupPage from './pages/PlayerSignupPage';
import WatcherSignupPage from './pages/WatcherSignupPage';


function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* AUTH PAGES (KEEP) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* NEW APPLICATION FLOW */}
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dares" element={<DaresPage />} />
          <Route path="/stream" element={<StreamPage />} />
          <Route path="/Setting" element={<SettingPage />} />

          {/* Legacy Redirects/Stubs */}
          <Route path="/home" element={<DashboardPage />} /> 
          {/* We are removing the old dashboard routes, the stubs were created in the previous step but won't be explicitly routed here to keep the structure clean */}
          <Route path="/profile" element={<SettingPage />} />

          {/* Player/Watcher Flow Stubs */}
          <Route path="/html/circle.html" element={<PlayerLoadingPage />} />
          <Route path="/html/player_signup.html" element={<PlayerSignupPage />} />
          <Route path="/html/watcher_signup.html" element={<WatcherSignupPage />} />

          {/* System Routes */}
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} /> 
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
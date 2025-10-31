import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Load env
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development' });

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection and server bootstrap
async function startServer() {
  if (!process.env.MONGO_URI) {
    console.error('Missing MONGO_URI. Add it to .env.development or environment variables.');
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    console.log('Successfully connected to MongoDB.');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err?.message || err);
    process.exit(1);
  }
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());

// Routes (ESM imports)
import registerRoute from './backend/api/register.js';
import loginRoute from './backend/api/login.js';
import playerSignupRoute from './backend/api/player_signup.js';
import watcherSignupRoute from './backend/api/watcher_signup.js';

app.use('/api', registerRoute);
app.use('/api', loginRoute);
app.use('/api', playerSignupRoute);
app.use('/api', watcherSignupRoute);

// Logout clears the token cookie
// app.post('/api/logout', (req, res) => {
//   res.clearCookie('token', {
//     httpOnly: true,
//     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//     secure: process.env.NODE_ENV === 'production',
//   });
//   res.json({ success: true });
// });

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Simple health endpoint to check DB connectivity state
app.get('/api/health', (_req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const state = states[mongoose.connection.readyState] || 'unknown';
  res.json({ dbState: state, nodeEnv: process.env.NODE_ENV || 'development' });
});

// Start only after DB is connected
startServer();


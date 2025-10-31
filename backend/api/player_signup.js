import express from 'express';
import Player from '../models/player.js';

const router = express.Router();

// POST /api/player_signup
router.post('/player_signup', async (req, res) => {
    const { email, user_type } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        if (!user_type) {
            return res.status(400).json({ message: 'user_type is required' });
        }
        // Check if player already exists
        const existingPlayer = await Player.findOne({ email });
        if (existingPlayer) {
            return res.json({ exists: true });
        }

        // Create new player
        const newPlayer = new Player({ email, user_type });
        await newPlayer.save();

        res.json({ exists: false });
    } catch (err) {
        console.error('Player signup error:', err);
        const message = process.env.NODE_ENV === 'production' ? 'Server error' : err.message;
        res.status(500).json({ message });
    }
});

export default router;
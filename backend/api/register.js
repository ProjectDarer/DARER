import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// POST /api/signup
router.post('/signup', async (req, res) => {
    const { username, password, phone, dob } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({ exists: true });
        }

        // Create new user
        const newUser = new User({ username, password, phone, dob });
        await newUser.save();

        // Issue JWT on signup for immediate login
        const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ exists: false });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
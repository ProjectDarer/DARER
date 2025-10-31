import express from 'express';
import Watcher from '../models/watcher.js';

const router = express.Router();

// POST /api/watcher_signup
router.post('/watcher_signup', async (req, res) => {
    const { email, user_type } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        if (!user_type) {
            return res.status(400).json({ message: 'user_type is required' });
        }
        // Check if user already exists
        const existingUser = await Watcher.findOne({ email });
        if (existingUser) {
            return res.json({ exists: true });
        }

        // Create new user
        const newUser = new Watcher({ email, user_type });
        await newUser.save();
        res.json({ exists: false });
    } catch (err) {
        console.error('Watcher signup error:', err);
        const message = process.env.NODE_ENV === 'production' ? 'Server error' : err.message;
        res.status(500).json({ message });
    }
});

// router.get('/watcher_signup', (req, res) => {
//     res.send('Watcher signup endpoint is working (but use POST to submit data)');
// });


export default router;
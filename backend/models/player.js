import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    // username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    user_type: { type: String, required: true },
});

export default mongoose.model('Player', playerSchema);
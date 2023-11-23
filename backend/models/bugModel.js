const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Open', 'Assigned', 'Resolved'], default: 'Open' },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pictureURL: { type: String }, 
    resolveMessage: { type: String}, 
    createdAt: { type: Date, default: Date.now },
});

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;
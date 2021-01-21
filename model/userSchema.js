const mongoose = require('mongoose');
module.exports = mongoose.model(
    'user',
    mongoose.Schema({
        name: { type: String },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        isStudent: { type: Boolean, required: true, default: true },
        isFaculty: { type: Boolean, required: true, default: false },
        sampleImages: [{ type: String }]
    })
);
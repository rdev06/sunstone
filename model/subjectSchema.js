const mongoose = require('mongoose');
module.exports = mongoose.model(
    'subject',
    mongoose.Schema({
        name: { type: String, unique: true, required: true }
    })
);
const mongoose = require('mongoose');
const deliverableSchema = mongoose.Schema({
    facultyId: { type: mongoose.Types.ObjectId, ref: 'user', required: true, index: true },
    subjectId: { type: mongoose.Types.ObjectId, ref: 'subject', required: true },
    price: { type: Number, required: true }
});
deliverableSchema.index({ facultyId: 1, subjectId: 1 }, { unique: true });
module.exports = mongoose.model('deliverable', deliverableSchema)
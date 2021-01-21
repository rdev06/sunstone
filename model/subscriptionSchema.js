const mongoose = require('mongoose');
const subscriptionSchema = mongoose.Schema({
    studentId: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    deliveryId: { type: mongoose.Types.ObjectId, ref: 'deliverable', required: true },
    subscribedAt: { type: Date, default: new Date(), required: true }
});
subscriptionSchema.index({ studentId: 1, deliveryId: 1 }, { unique: true })
module.exports = mongoose.model('subcription', subscriptionSchema)
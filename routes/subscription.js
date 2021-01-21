const router = require('express').Router();
const subscriptionSchema = require('../model/subscriptionSchema');
router.get('/', (req, res) => subscriptionSchema.find({ studentId: req.user.userId })
    .populate({ path: 'deliveryId', select: '-__v', populate: { path: 'facultyId subjectId', select: '-__v -password' } }).select('-studentId -__v')
    .then(subscriptions => res.json(subscriptions)).catch(console.error))

router.post('/', (req, res) => subscriptionSchema.create({ studentId: req.user.userId, deliveryId: req.body.deliveryId })
    .then(subscription => res.json(subscription))
    .catch(err => {
        if (err.code == 11000) res.status(401).json({ msg: 'You had already subscribed this subject with this faculty' });
        else res.status(401).json({ msg: 'Unexpected Error', err })
    }))

router.put('/', (req, res) => subscriptionSchema.findByIdAndUpdate(req.body.subscriptionId, { $set: { deliveryId: req.body.deliveryId } }, { new: true })
    .then(subscription => res.json(subscription))
    .catch(console.error))

router.delete('/', (req, res) => subscriptionSchema.findByIdAndDelete(req.body.subscriptionId)
    .then(() => res.json({ msg: 'Deleted' }))
    .catch(console.error))

module.exports = router;
const deliverableSchema = require('../model/deliverableSchema');

const router = require('express').Router();
router.get('/', (req, res) => deliverableSchema.find({ facultyId: req.user.userId })
    .populate('subjectId', 'name -_id').select('-facultyId -__v')
    .then(deliveries => res.json(deliveries)).catch(console.error));

router.post('/', (req, res) => deliverableSchema.create({ ...req.body, facultyId: req.user.userId })
    .then(delivery => res.json(delivery))
    .catch(err => {
        if (err.code == 11000) res.status(401).json({ msg: 'You are already a faculty of this subject' });
        else res.status(401).json({ msg: 'Unexpected Error', err })
    }))

router.put('/', (req, res) => deliverableSchema.findByIdAndUpdate(req.body.deliverableId, { $set: req.body }, { new: true })
    .then(delivery => res.json(delivery))
    .catch(console.error))

router.delete('/', (req, res) => deliverableSchema.findByIdAndDelete(req.body.deliverableId)
    .then(() => res.json({ msg: 'Deleted' }))
    .catch(console.error))

module.exports = router;
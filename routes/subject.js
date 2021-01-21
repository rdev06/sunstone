const router = require('express').Router();
const isSuperAdmin = require('../middlewares/isSuperAdmin');
const subjectSchema = require('../model/subjectSchema');

router.get('/', (req, res) => subjectSchema.find().select('-__v')
    .then(subjects => res.json(subjects))
    .catch(console.error));
router.post('/', isSuperAdmin, (req, res) => subjectSchema.create(req.body)
    .then(subject => res.json(subject))
    .catch(err => {
        if (err.code == 11000) res.status(402).json({ msg: 'This subject already exist' })
        else res.status(402).json({ msg: 'Unexpected Error', err })
    }));
router.put('/', isSuperAdmin, (req, res) => {
    delete req.body._id;
    subjectSchema.findByIdAndUpdate(req.body.subjectId, { $set: req.body }, { new: true })
        .then(subject => res.json(subject))
        .catch(err => {
            if (err.code == 11000) res.status(402).json({ msg: 'This subject already exist' })
            else res.status(402).json({ msg: 'Unexpected Error', err })
        })
});
router.delete('/', (req, res) => subjectSchema.findByIdAndDelete(req.body.subjectId)
    .then(() => res.json({ msg: 'Deleted' }))
    .catch(err => res.status(402).json({ msg: 'Unexpected Error', err }))
);
module.exports = router;
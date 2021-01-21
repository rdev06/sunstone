const router = require('express').Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const isFaculty = require('../middlewares/isFaculty');
const isStudent = require('../middlewares/isStudent');

router.use('/user', require('./user'));
router.use('/subject', require('./subject'));
router.use('/deliverable', isLoggedIn, isFaculty, require('./deliverable'));
router.use('/subscription', isLoggedIn, isStudent, require('./subscription'));

router.get('/', (req, res) => res.send('Welcome to api v.1.0'));
module.exports = router;
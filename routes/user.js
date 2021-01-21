const router = require('express').Router();
const userSchema = require('../model/userSchema');
const login = require('../helpers/login');
const isLoggedIn = require('../middlewares/isLoggedIn');

router.get('/', isLoggedIn, (req, res) => res.json(req.user));

router.post('/', async (req, res) =>
    userSchema.create(req.body)
        .then(user => login(user.email, user.password))
        .then(user => res.json({ msg: 'Logged In', user }))
        .catch(err => {
            /**
             * As we know we have to handle three errors
             * register duplicate error code 11000
             * login error code 401
             * any other error
            */
            switch (err.code) {
                case 11000:
                    res.status(402).json({ msg: 'User already exist with this email ID Kindly login directly' });
                    break;
                case 401:
                    res.status(401).json({ msg: err.msg });
                    break;
                default:
                    console.error(err);
                    break;
            }
        }));

router.post('/login', async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        res.json({ msg: 'Logged In', user });
    } catch (err) {
        if (err.code == 401) res.status(401).json({ msg: err.msg });
        else console.error(err);
    }
})

router.put('/', isLoggedIn, (req, res) => {
    delete req.body._id;
    userSchema.findByIdAndUpdate(req.user.userId, { $set: req.body }, { new: true }).select('-password -__v').then(user => res.json(user)).catch(console.error)
})

router.delete('/', isLoggedIn, (req, res) => userSchema.findByIdAndDelete(req.user.userId).then(() => res.json({ msg: 'Your account deleted' })).catch(console.error))
module.exports = router;
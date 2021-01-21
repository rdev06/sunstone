const userSchema = require('../model/userSchema');

module.exports = async (req, res, next) => {
    if (!req.headers.token) res.status(401).json({ msg: 'Auth Failed', reason: 'token not found in header!' });
    else {
        try {
            const user = await userSchema.findById(req.headers.token).select('-_id -password -__v').lean();
            if (!user) res.status(401).json({ msg: 'Token is of no use' });
            else {
                req.user = user;
                req.user.userId = req.headers.token;
                next();
            }
        } catch (error) {
            console.error(error);
            res.status(401).json({ msg: 'Invalid token' });
        }
    }
}

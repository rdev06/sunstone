const { superAdminToken } = require('../config');

module.exports = (req, res, next) => {
    if (req.headers.token === superAdminToken) next();
    else res.status(402).json({ msg: 'You are not authorised to create subjects' })
};
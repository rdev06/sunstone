module.exports = (req, res, next) => {
    if (req.user.isStudent) next();
    else res.status(401).json({ msg: 'You are not a student' })
}
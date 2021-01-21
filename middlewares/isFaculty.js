module.exports = (req, res, next) => {
    if (req.user.isFaculty) next();
    else res.status(401).json({ msg: 'You are not a faculty' })
}
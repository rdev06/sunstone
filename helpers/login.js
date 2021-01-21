const userSchema = require('../model/userSchema');
module.exports = async (email, password) => {
    const user = await userSchema.findOne({ email }).select('-__v').lean();
    if (!user) {
        throw { code: 401, msg: 'User not Found' };
    }
    if (user && user.password != password) {
        throw { code: 401, msg: 'Wrong Password' };
    } else {
        user.token = user._id;
        delete user._id;
        delete user.password;
        return user;
    }
}
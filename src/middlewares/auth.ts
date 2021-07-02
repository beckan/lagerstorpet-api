import mongoose from "mongoose";

const auth = async (req, res, next) => {
    const Token = mongoose.model('Token');

    const token = req.headers['x-token'];

    if (!token || !await Token.findOne({token})) {
        res.sendStatus(401);
        return;
    }

    setTimeout(() => {
        next();
    }, 1);
};

export default auth;
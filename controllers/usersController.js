// const db = require("../models/db.js");
const createError = require("http-errors");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res, next) => {
    // let userInfo = db.get("userInfo").value();

    try {
        const userInfo = await User.find().populate("contact", "-__v");
        res.json({ success: true, userInfo: userInfo });
    }
    catch (err) {
        next(err);
    };
};

exports.getUser = async (req, res, next) => {
    // let userInfo = db.get("userInfo").find({ id: req.params.id });
    const { id } = req.params;
    try {
        const userInfo = await User.findById(id).populate("contact", "-__v -_id");
        res.json({ success: true, userInfo: userInfo });
    }
    catch (err) {
        next(err);
    };
};

exports.postUser = async (req, res, next) => {
    // db.get("userInfo").push(req.body).last().assign({ id: new Date().getTime().toString() }).write();
    // res.json({ success: true, userInfo: req.body });
    try {
        const user = new User(req.body);
        const token = user.generateAuthToken();
        await user.save();

        const data = user.getPublicFields();

        res.header("x-auth", token).json({ success: true, newUser: data });
    }
    catch (err) {
        next(err);
    };
};

exports.putUser = async (req, res, next) => {
    // db.get("userInfo").find({ id }).assign(userInfo).write();
    // res.json({ success: true, userInfo: userInfo });
    const { id } = req.params;
    const user = req.body;
    try {
        const userInfo = await User.findByIdAndUpdate(id, user, { new: true }).populate("contact", "-__v -_id");
        if (!user) throw createError(404);
        res.json({ success: true, userInfo: userInfo });
    }
    catch (err) {
        next(err);
    };

};

exports.deleteUser = async (req, res, next) => {
    // const userInfo = db.get("userInfo").remove({ id }).write();
    const { id } = req.params;
    try {
        const userInfo = await User.findByIdAndDelete(id);
        if (!userInfo) throw createError(404);
        res.json({ success: true, userInfo: userInfo });
    }
    catch (err) {
        next(err);
    };
};

exports.login = async (req, res, next) => {
    const { userName, password } = req.body;

    try {
        const user = await User.findOne({ userName });
        if (!user) throw createError(404);
        // let token = jwt.sign({ _id: user._id }, "secretKey");
        const valid = await user.checkPassword(password);
        if (!valid) throw createError(403);

        let token = user.generateAuthToken();
        const data = user.getPublicFields();

        res.header("x-auth", token).json({ success: true, user: data });
    }
    catch (err) {
        next(err);
    };
};
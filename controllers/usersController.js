// const db = require("../models/db.js");
const createError = require("http-errors");
const User = require("../models/userSchema");

exports.getUsers = async (req, res, next) => {
    // let userInfo = db.get("userInfo").value();

    try {
        const userInfo = await User.find();
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
        const userInfo = await User.findById(id);
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
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ success: true, newUser: newUser });
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
        const userInfo = await User.findByIdAndUpdate(id, user, { new: true });
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

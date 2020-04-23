const createError = require("http-errors");
const db = require("../models/db.js");
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

exports.postUser = (req, res) => {
    db.get("userInfo").push(req.body).last().assign({ id: new Date().getTime().toString() }).write();
    res.json({ success: true, userInfo: req.body });
};

exports.putUser = (req, res) => {
    const { id } = req.params;
    const userInfo = req.body;
    db.get("userInfo").find({ id }).assign(userInfo).write();
    res.json({ success: true, userInfo: userInfo });
};

exports.deleteUser = (req, res, next) => {
    if (req.params.id !== "1") {
        next(createError(500));
    };

    const { id } = req.params;
    const userInfo = db.get("userInfo").remove({ id }).write();
    res.json({ success: true, userInfo: userInfo });
};

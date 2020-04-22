const db = require("../models/db.js");
const createError = require("http-errors");

exports.getUsers = (req, res) => {
    let userInfo = db.get("userInfo").value();
    res.json({ success: true, userInfo: userInfo });
};

exports.getUser = (req, res) => {
    let userInfo = db.get("userInfo").find({ id: req.params.id });
    res.json({ success: true, userInfo: userInfo });
};

exports.postUser = (req, res) => {
    db.get("userInfo").push(req.body).last().assign({ id: new Date().toString() }).write();
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

const db = require("../models/db.js");
const createError = require("http-errors");

exports.getContacts = (req, res) => {
    let contactInfo = db.get("contactInfos").value();
    res.json({ success: true, contactInfo: contactInfo });
};

exports.getContact = (req, res) => {
    let contactInfo = db.get("contactInfos").find({ id: req.params.id });
    res.json({ success: true, contactInfo: contactInfo });
};

exports.postContact = (req, res) => {
    db.get("contactInfos").push(req.body).last().assign({ id: new Date().getTime().toString() }).write();
    res.json({ success: true, contactInfo: req.body });
};

exports.putContact = (req, res) => {
    const { id } = req.params;
    const contactInfo = req.body;
    db.get("contactInfos").find({ id }).assign(contactInfo).write();
    res.json({ success: true, contactInfo: contactInfo });
};

exports.deleteContact = (req, res, next) => {
    if (req.params.id !== "1") {
        next(createError(500));
    };

    const { id } = req.params;
    const contactInfo = db.get("contactInfos").remove({ id }).write();
    res.json({ success: true, contactInfo: contactInfo });
};

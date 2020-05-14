// const db = require("../models/db.js");
const createError = require("http-errors");
const Contact = require("../models/contactSchema");
const jwt = require("jsonwebtoken");

exports.getContacts = async (req, res, next) => {
    // let contactInfo = db.get("contactInfos").value();
    try {
        const value = req.header("x-auth");
        const check = jwt.verify(value, "secretKey");
        if (check) {
            const contactInfo = await Contact.find().populate("userName", "-__v");
            res.json({ success: true, contactInfo: contactInfo });
        } else {
            throw createError(404);
        };
    }
    catch (err) {
        next(err);
    };
};

exports.getContact = async (req, res, next) => {
    // const contactInfo = db.get("contactInfos").find(id);
    const { id } = req.params;
    try {
        const contactInfo = await Contact.findById(id).populate("userName", "-__v");
        res.json({ success: true, contactInfo: contactInfo });
    }
    catch (err) {
        next(err);
    };
};

exports.postContact = async (req, res, next) => {
    // db.get("contactInfos").push(req.body).last().assign({ id: new Date().getTime().toString() }).write();
    try {
        const newContactInfo = new Contact(req.body);
        await newContactInfo.save();
        res.json({ success: true, newContactInfo: newContactInfo });
    }
    catch (err) {
        next(err);
    };
};

exports.putContact = async (req, res, next) => {
    // db.get("contactInfos").find({ id }).assign(contactInfo).write();
    const { id } = req.params;
    const contactInfo = req.body;
    try {
        const updateInfo = await Contact.findByIdAndUpdate(id, contactInfo, { new: true });
        if (!contactInfo) throw createError(404);
        res.json({ success: true, updateInfo: updateInfo });
    }
    catch (err) {
        next(err);
    };
};

exports.deleteContact = async (req, res, next) => {
    // const contactInfo = db.get("contactInfos").remove({ id }).write();
    const { id } = req.params;
    const contactInfo = req.body;
    try {
        const deleteInfo = await Contact.findByIdAndDelete(id, contactInfo);
        if (!contactInfo) throw createError(404);
        res.json({ success: true, contactInfo: contactInfo });
    }
    catch (err) {
        next(err);
    };
};

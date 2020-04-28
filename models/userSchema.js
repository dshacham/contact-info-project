const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        userName: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema(
    {
        userName: { type: String, required: true, unique: true },

        password: { type: String, required: true },

        contact: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" }
    }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
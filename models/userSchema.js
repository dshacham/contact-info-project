const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require("jsonwebtoken");
const { encrypt, compare } = require("../lib/encryption");
const env = require("../config/config");

const UserSchema = new Schema(
    {
        userName: { type: String, required: true, unique: true },

        password: { type: String, required: true },

        tokens: [
            {
                token: {
                    type: String,
                    required: true
                },
            }
        ],

        role: {
            type: String,
            enum: ["User", "Admin"],
            required: true
        },

        // contact: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" }
    }
);

UserSchema.plugin(uniqueValidator);

//another way to do tokens:
UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, env.jwt_key).toString();

    user.tokens.push({ token });

    return token;
};

UserSchema.methods.getPublicFields = function () {
    let returnObject = {
        userName: this.userName,
        _id: this._id
    };
    return returnObject;
};

UserSchema.pre("save", async function (next) {
    this.password = await encrypt(this.password);
    next();
});

UserSchema.methods.checkPassword = async function (password) {
    const user = this;
    return await compare(password, user.password);
};

UserSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, env.jwt_key);
    }
    catch (e) {
        return;
    };

    const user = User.findOne({
        _id: decoded._id,
    }).select("-password -__v");

    return user;
};

module.exports = mongoose.model("User", UserSchema);
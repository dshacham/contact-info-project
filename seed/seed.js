const mongoose = require("mongoose");
const User = require("../models/userSchema");
const faker = require("faker");

const main = async (req, res) => {
    mongoose.connect("mongodb://127.0.0.1:27017/contact-info", { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on("error", (err) => console.log(err));
    mongoose.connection.on("open", () => console.log("database connected"));

    try {
        await User.deleteMany({});
        console.log("removing previous users from database...");
    }
    catch (err) {
        console.log(err);
    };

    const userPromises = Array(10).fill(null).map(() => {
        const user = new User({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            userName: faker.internet.userName(),
            password: faker.internet.password()
        });

        return user.save();
    });

    try {
        await Promise.all(userPromises);
        console.log("users added to the database");
    }
    catch (err) {
        console.log(err);
    };
};
main();
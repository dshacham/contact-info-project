const express = require("express");
const app = express();
const createError = require("http-errors");
const mongoose = require("mongoose");

const indexRoute = require("./routes/indexRoute");
const contactRoute = require("./routes/contactRoute");
const usersRoute = require("./routes/usersRoute");

mongoose.connect("mongodb://127.0.0.1:27017/contact-info", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.on("error", (err) => console.log(err));
mongoose.connection.on("open", () => console.log("database connected"));

const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/", indexRoute);
app.use("/contact", contactRoute);
app.use("/users", usersRoute);


app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.json({ status: err.status, message: err.message });
});

app.listen(port, () => console.log(`listening on port ${port}`));
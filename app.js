const express = require("express");
const app = express();
const createError = require("http-errors");

const indexRoute = require("./routes/indexRoute");
const contactRoute = require("./routes/contactRoute");
const usersRoute = require("./routes/usersRoute");

const port = process.env.PORT || 3000;

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
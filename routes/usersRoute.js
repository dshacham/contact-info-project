const Route = require("express").Router();
const { getUsers, getUser, postUser, putUser, deleteUser, login } = require("../controllers/usersController");
const { validateUserInputs } = require("../middleware/userValidator");
const auth = require("../middleware/authenticator");

Route.get("/", getUsers);
Route.get("/:id", auth, getUser);
Route.post("/register", validateUserInputs(), postUser);
Route.post("/login", login)
Route.put("/:id", auth, putUser);
Route.delete("/:id", auth, deleteUser);

module.exports = Route;
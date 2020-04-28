const Route = require("express").Router();
const { getUsers, getUser, postUser, putUser, deleteUser } = require("../controllers/usersController");
const { validateUserInputs } = require("../middleware/userValidator");

Route.get("/", getUsers);
Route.get("/:id", getUser);
Route.post("/", validateUserInputs(), postUser);
Route.put("/:id", putUser);
Route.delete("/:id", deleteUser);

module.exports = Route;
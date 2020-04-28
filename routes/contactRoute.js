const Route = require("express").Router();
const { getContacts, getContact, postContact, putContact, deleteContact } = require("../controllers/contactController");
const { validateContactInputs } = require("../middleware/contactValidator");

Route.get("/", getContacts);
Route.get("/:id", getContact);
Route.post("/", validateContactInputs(), postContact);
Route.put("/:id", putContact);
Route.delete("/:id", deleteContact);

module.exports = Route;
const express = require("express");

const { createRole, roles } = require("./../controller/role");

const roleRouter = express.Router();

roleRouter.post("/createrole", createRole);
roleRouter.get("/roles", roles);

module.exports = roleRouter;
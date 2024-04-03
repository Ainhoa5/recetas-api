const express = require("express");
const api = express.Router();
const userController = require("../controllers/userController");
const { userValidationRules, validate } = require('../../middleware/validationMiddleware');

api.get("/user/", userController.getUsers); // get all
api.put("/user/:idUser", userController.updateUser); // update
api.delete("/user/:idUser", userController.deleteUser); // delete
api.get("/bypassword/:idUser", userController.getPasswordById);
api.post("/user/register", userValidationRules(), validate, userController.registerUser);
api.post("/user/login", userValidationRules(), validate, userController.loginUser);


module.exports = api;

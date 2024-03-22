const express = require("express");
const api = express.Router();
const userController = require("../controllers/userController");
const authServerController = require("../servers/authServer.js");
const serverController = require("../servers/server.js");


api.get("/user/", userController.getUsers); // get all
api.put("/user/:idUser", userController.updateUser); // update
api.delete("/user/:idUser", userController.deleteUser); // delete
api.get("/bypassword/:idUser", userController.getPasswordById);
api.post("/user/register", userController.registerUser);
api.post("/user/login", userController.loginUser, authServerController.handleTokenRequest);

//token
//app.post('/token', authServerController.handleTokenRequest);//genera token
app.delete('/logout', serverController.handleLogoutRequest);//elimina el token
app.get('/posts', serverController.authenticateToken, serverController.handleGetPosts);

module.exports = api;

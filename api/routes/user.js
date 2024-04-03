const express = require("express");
const api = express.Router();
const userController = require("../controllers/userController");

/**
 * Estas rutas definen las operaciones CRUD para el recurso de usuario.
 * Utilizan los métodos definidos en el controlador de usuario.
 */

// Obtener todos los usuarios
api.get("/user/", userController.getUsers);

// Actualizar un usuario por ID
api.put("/user/:idUser", userController.updateUser);

// Eliminar un usuario por ID
api.delete("/user/:idUser", userController.deleteUser);

// Obtener la contraseña de un usuario por ID
api.get("/bypassword/:idUser", userController.getPasswordById);

// Registrar un nuevo usuario
api.post("/user/register", userController.registerUser);

// Iniciar sesión como usuario
api.post("/user/login", userController.loginUser);

module.exports = api;

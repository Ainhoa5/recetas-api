// app.js
const express = require('express');
const app = express();

const setupMiddleware = require('./middleware/middleware');
const { handle404, handleErrors } = require('./middleware/errorHandling');

// Configura middlewares comunes
setupMiddleware(app);

//Cargar rutas
const recipe_routes = require("./api/routes/recipe");

//Rutas base
app.use("/api", recipe_routes);

// Manejo de errores
app.use(handle404);
app.use(handleErrors);

module.exports = app;

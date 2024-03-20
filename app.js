const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const setupMiddleware = require('./middleware/middleware');
// Configura middlewares comunes
setupMiddleware(app);

// Cargar rutas
const recipeRoutes = require("./api/routes/recipe");
// Rutas base
app.use("/api", recipeRoutes);

// Importa tus middlewares de manejo de errores
const { handle404, handleErrors } = require('./middleware/errorHandling');

// Middleware para manejar rutas no encontradas (404)
app.use(handle404);

// Middleware para manejar errores
app.use(handleErrors);

module.exports = app;
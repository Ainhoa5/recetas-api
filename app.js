// app.js
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const setupMiddleware = require('./middleware/middleware');

// Configura middlewares comunes
setupMiddleware(app);

//Cargar rutas
const recipe_routes = require("./api/routes/recipe");

//Rutas base
app.use("/api", recipe_routes);

module.exports = app;

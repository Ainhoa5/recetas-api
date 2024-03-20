const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const setupMiddleware = require('./middleware/middleware');
// Configura middlewares comunes
setupMiddleware(app);

//Cargar rutas
const recipe_routes = require("./api/routes/recipe");
const user_routes = require("./api/routes/user");


//Rutas base
app.use("/api", recipe_routes);
app.use("/admin", user_routes);


module.exports = app;
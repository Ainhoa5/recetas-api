// app.js
const express = require('express');
const app = express();

const setupMiddleware = require('./middleware/middleware');
const { handle404, handleErrors } = require('./middleware/errorHandling');
const productRoutes = require('./api/routes/products');

// Configura middlewares comunes
setupMiddleware(app);

// Rutas
app.use('/products', productRoutes);

// Manejo de errores
app.use(handle404);
app.use(handleErrors);

module.exports = app;

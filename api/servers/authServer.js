// Define el puerto del servidor obtenido de la variable de entorno PORT o usa el puerto 4000 por defecto
const port = process.env.PORT || 4000;

// Carga las variables de entorno desde el archivo .env
require('dotenv').config();

// Importa Express para manejar las rutas HTTP
const express = require('express');

// Importa jsonwebtoken para trabajar con JWT
const jwt = require('jsonwebtoken');

// Importa la configuración de la base de datos MongoDB
const mongoose = require('./config/database'); // Asegúrate de que la ruta sea correcta

// Importa el modelo de tokens de actualización
const RefreshToken = require('./models/RefreshToken');

// Crea una instancia de la aplicación Express
const app = express();

// Middleware para permitir a Express entender JSON en las solicitudes
app.use(express.json());

// Ruta POST para solicitar un nuevo token de acceso utilizando un token de actualización
app.post('/token', async (req, res) => {
    const refreshToken = req.body.token;
    // Rechaza la solicitud si no se proporciona un token de actualización
    if (refreshToken == null) return res.sendStatus(401);

    // Busca el token de actualización en la base de datos
    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    // Rechaza la solicitud si el token de actualización no está en la base de datos
    if (!storedToken) return res.sendStatus(403);

    // Verifica el token de actualización y genera un nuevo token de acceso si es válido
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken });
    });
});

// Ruta DELETE para desloguear al usuario eliminando su token de actualización
app.delete('/logout', async (req, res) => {
    // Elimina el token de actualización de la base de datos
    await RefreshToken.deleteOne({ token: req.body.token });
    res.sendStatus(204); // Respuesta exitosa sin contenido
});

// Ruta POST para loguear al usuario y generar tokens de acceso y actualización
app.post('/login', async (req, res) => {
    // Aquí se debería autenticar al usuario (no implementado en este ejemplo)
    const username = req.body.username;
    const user = { name: username };

    // Genera un nuevo token de acceso
    const accessToken = generateAccessToken(user);
    // Genera un nuevo token de actualización y lo guarda en la base de datos
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    const newRefreshToken = new RefreshToken({ token: refreshToken });
    await newRefreshToken.save();

    // Envía los tokens de acceso y actualización al cliente
    res.json({ accessToken, refreshToken });
});

// Función para generar un token de acceso con una duración corta
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
}

// Inicia el servidor en el puerto definido
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));

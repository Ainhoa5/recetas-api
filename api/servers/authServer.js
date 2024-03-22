// Importa y carga las variables de entorno desde el archivo .env
require('dotenv').config()

// Importa Express para el manejo de rutas y middleware
const express = require('express')
const app = express()

// Importa jsonwebtoken para trabajar con tokens JWT
const jwt = require('jsonwebtoken')

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json())

// Array para almacenar los tokens de actualización
let refreshTokens = []

// Función que maneja la solicitud de generación de un nuevo token de acceso
function handleTokenRequest(req, res) {
    const refreshToken = req.body.token;
    // Verifica si se proporcionó un token de actualización
    if (refreshToken == null) return res.sendStatus(401);
    // Verifica si el token de actualización está en la lista de tokens permitidos
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    // Verifica y decodifica el token de actualización
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      // Si hay un error en la verificación, devuelve un estado de prohibido
      if (err) return res.sendStatus(403);
      // Genera un nuevo token de acceso y lo envía como respuesta
      const accessToken = generateAccessToken({ name: user.name });
      res.json({ accessToken: accessToken });
    });
}

  // Función que maneja la solicitud de cierre de sesión
function handleLogoutRequest(req, res) {
    // Filtra y elimina el token de actualización de la lista de tokens permitidos
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    // Devuelve un estado sin contenido (204)
    res.sendStatus(204);
  }

// Función para generar un token de acceso con una duración corta
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '40s' })
}

// Inicia el servidor en el puerto 4000
app.listen(4000)

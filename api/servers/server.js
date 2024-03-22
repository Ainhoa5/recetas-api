// Carga las variables de entorno desde un archivo .env, útil para gestionar claves secretas y configuraciones
require('dotenv').config()

// Importa el framework Express para crear y manejar el servidor web
const express = require('express')
// Inicializa la aplicación Express
const app = express()
// Importa la biblioteca jsonwebtoken para manejar tokens JWT (JSON Web Tokens)
const jwt = require('jsonwebtoken')

// Middleware para parsear el cuerpo de las solicitudes entrantes a formato JSON
app.use(express.json())

//import de el modelo usuario
const post = require('../models/userModel.js');

// Función que maneja la solicitud de obtención de publicaciones de un usuario autenticado
function handleGetPosts(req, res) {
  // Filtra y devuelve solo las publicaciones del usuario autenticado
  res.json(posts.filter(post => post.username === req.user.name));
}

// Middleware para autenticar el token de acceso
function authenticateToken(req, res, next) {
  // Extrae el token de acceso del encabezado de autorización
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // El token es el segundo elemento del encabezado
  // Si no hay token, devuelve un error 401 (No Autorizado)
  if (token == null) return res.sendStatus(401)

  // Verifica el token utilizando la clave secreta y continúa con la petición si es válido
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // Si la verificación falla, devuelve un error 403 (Prohibido)
    if (err) return res.sendStatus(403)
    // Si el token es válido, adjunta el usuario al objeto de solicitud y pasa al siguiente middleware
    req.user = user
    next()
  })
}

// Inicia el servidor en el puerto 3000
app.listen(3000)

// Importa y configura Express
const express = require('express');
const app = express();

// Importa el módulo jsonwebtoken para manejar tokens JWT
const jwt = require('jsonwebtoken');

// Importa Mongoose para conectarse a MongoDB y definir modelos
const mongoose = require('mongoose');

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Se define el puerto con el que trabajará la aplicación
const port = process.env.PORT || 3000;

// Se establece la conexión a la base de datos MongoDB
//mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//    .then(() => console.log('Conexión a MongoDB establecida'))
//    .catch(err => console.error('Error al conectar a MongoDB:', err));
//
// Modelo para las publicaciones
const Post = mongoose.model('Post', { username: String, title: String });

// Ruta para obtener las publicaciones de un usuario autenticado
app.get('/posts', authenticateToken, async (req, res) => {
    try {
        // Se obtienen las publicaciones del usuario autenticado desde la base de datos
        const posts = await Post.find({ username: req.userModel.nombre });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Middleware para autenticar el token de acceso
function authenticateToken(req, res, next) {
    // Se obtiene el encabezado de autorización de la solicitud
    const authHeader = req.headers['authorization'];
    // Se verifica si existe el encabezado de autorización y se extrae el token de acceso
    const token = authHeader && authHeader.split(' ')[1];

    // Si no hay token, se devuelve un código de estado 401 (No autorizado)
    if (token == null) return res.sendStatus(401);

    // Se verifica el token de acceso utilizando la clave secreta almacenada en variables de entorno
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // Si hay un error al verificar el token, se devuelve un código de estado 403 (Prohibido)
        if (err) return res.sendStatus(403);
        // Si la verificación es exitosa, se guarda el usuario en el objeto de solicitud y se pasa al siguiente middleware
        req.user = user;
        next();
    })
}

// Inicia el servidor en el puerto especificado
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));

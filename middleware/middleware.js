const morgan = require('morgan'); // middleware de registro de solicitudes HTTP
const bodyParser = require('body-parser'); // procesar datos codificados en URL y en formato JSON en el cuerpo de las solicitudes

// trabajar con el sistema de archivos y rutas de archivos.
const fs = require('fs');
const path = require('path');

// Crea un stream de escritura que apunta a 'access.log', abriendo el archivo para añadir contenido (flag 'a') sin sobrescribir el contenido existente.
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Define una función setupMiddleware que toma como argumento una instancia de una aplicación Express.
const setupMiddleware = (app) => {
    // Configura Morgan para registrar las solicitudes recibidas en el formato 'combined' y las escribe en el archivo 'access.log'.
    app.use(morgan('combined', { stream: accessLogStream }));

    // Utiliza body-parser para procesar cuerpos de solicitud con datos codificados en URL.
    app.use(bodyParser.urlencoded({extended: false}));

    // Utiliza body-parser para procesar cuerpos de solicitud en formato JSON.
    app.use(bodyParser.json());

    // Configura cabeceras CORS para permitir solicitudes de cualquier origen y establece cabeceras permitidas y métodos para solicitudes preflight (OPTIONS).
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next(); // Continúa con el siguiente middleware en la cadena.
    });
};

// Exporta la función setupMiddleware para que pueda ser utilizada en otras partes de la aplicación.
module.exports = setupMiddleware;

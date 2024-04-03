const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads/')); // Asegúrate de que este directorio exista
    },
    filename: function(req, file, cb) {
        // Generación del nombre de archivo para evitar conflictos y problemas con caracteres especiales
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Filtro de archivos para permitir solo imágenes
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('No es un archivo de imagen'), false);
    }
};

// Configuración de Multer con los parámetros definidos
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limita el tamaño del archivo a 5MB
    }
});

module.exports = upload;

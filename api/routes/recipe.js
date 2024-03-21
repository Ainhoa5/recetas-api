const express = require('express');
const multer = require('multer');
const recipeController = require('../controllers/recipeController');

const api = express.Router();

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Asegúrate de que este directorio exista
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // Acepta solo imágenes
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('No es un archivo de imagen'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB
    }
});

// Rutas CRUD con el middleware de Multer para la ruta POST
api.post('/', upload.single('image'), recipeController.createRecipe);

// Resto de tus rutas
api.get('/', recipeController.getRecipes); 
api.get('/:idRecipe', recipeController.getRecipe);
api.put('/:idRecipe', recipeController.updateRecipe); 
api.delete('/:idRecipe', recipeController.deleteRecipe);

// Filtros y alergenos
api.get('/sin-alergenos/:alergenos', recipeController.getRecipesWithoutAllergens);
api.get('/byname/:nombre', recipeController.getRecipesByName);

module.exports = api;
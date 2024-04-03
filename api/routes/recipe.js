const express = require('express');
const recipeController = require('../controllers/recipeController');
const { authenticateToken } = require('../../middleware/authMiddleware');
const { recipeValidationRules, validate } = require('../../middleware/validationMiddleware');
const upload = require('../services/imageUploadService');

const api = express.Router();

// Requires auth
api.post('/', authenticateToken, upload.single('image'), recipeValidationRules(), validate, recipeController.createRecipe); // insertar
api.put('/:idRecipe', authenticateToken, recipeValidationRules(), validate, recipeController.updateRecipe); // actualizar
api.delete('/:idRecipe', authenticateToken, recipeController.deleteRecipe); // eliminar

// Doesnt require auth
api.get('/', recipeController.getRecipes);
api.get('/:idRecipe', recipeController.getRecipe);
// Filtros y alergenos
api.get('/sin-alergenos/:alergenos', recipeController.getRecipesWithoutAllergens);
api.get('/byname/:nombre', recipeController.getRecipesByName);

module.exports = api;
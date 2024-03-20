const express = require('express');
const api = express.Router();
const recipeController = require('../controllers/recipeController');

// CRUD recetas
api.get('/', recipeController.getRecipes); // get all
api.get('/:idRecipe', recipeController.getRecipe); // get by id
api.post('/', recipeController.createRecipe); // insert
api.put('/:idRecipe', recipeController.updateRecipe); // update
api.delete('/:idRecipe', recipeController.deleteRecipe); // delete

// Filtros y alergenos
api.get('/sin-alergenos/:alergenos', recipeController.getRecipesWithoutAllergens);
api.get('/byname/:nombre', recipeController.getRecipesByName);
module.exports = api;

const express = require('express');
const api = express.Router();
const recipeController = require('../controllers/recipeController');

api.get('/recetas/', recipeController.getRecipes); // get all
api.get('/recetas/:idRecipe', recipeController.getRecipe); // get by id
api.post('/recetas/', recipeController.createRecipe); // insert
api.put('/recetas/:idRecipe', recipeController.updateRecipe); // update
api.delete('/recetas/:idRecipe', recipeController.deleteRecipe); // delete
api.get('/recetas/sinalergeno/:allergen', recipeController.getRecipesWithoutAllergen);
api.get('/byname/:nombre', recipeController.getRecipesByName);
module.exports = api;

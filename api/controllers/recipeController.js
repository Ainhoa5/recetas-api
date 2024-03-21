const Recipe = require("../models/recipeModel");
const cloudinary = require('../../config/cloudinaryConfig');

//Crear tarea
// Crear receta con manejo de imagen
async function createRecipe(req, res) {
  const { nombre, ingredientes, alergenos } = req.body;

  let imageUrl = '';
  if (req.file) {
    // Si se subió una imagen, subirla a Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    imageUrl = result.secure_url; // Guardar la URL de la imagen
  }

  try {
    // Crear y guardar la nueva receta incluyendo la URL de la imagen
    const recipeStored = await Recipe.create({
      nombre,
      ingredientes,
      alergenos,
      imageUrl // Añade la URL de la imagen al documento
    });

    if (!recipeStored) {
      res.status(404).send({ msg: "No se ha podido guardar la receta" });
    } else {
      res.status(200).send({ recipe: recipeStored });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error del servidor" });
  }
}

//Obtener todas las tareas
async function getRecipes(req, res) {
  try {
    const recipes = await Recipe.find().sort({ created_at: -1 });
    if (!recipes) {
      res.status(400).send({ msg: "No se han encontrado recetas" });
    } else {
      res.status(200).send(recipes);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Obtener recetas por nombre
async function getRecipesByName(req, res) {
  const recipeName = req.params.nombre;

  try {
    const recipes = await Recipe.find({ nombre: new RegExp(recipeName, "i") });
    if (!recipes) {
      res.status(400).send({ msg: "No se han encontrado recetas" });
    } else {
      res.status(200).send(recipes);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Obtener tarea
async function getRecipe(req, res) {
  const idRecipe = req.params.idRecipe;

  try {
    const recipe = await Recipe.findById(idRecipe);

    if (!recipe) {
      res.status(400).send({ msg: "No se ha encontrado la receta" });
    } else {
      res.status(200).send(recipe);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Actualizar tarea
async function updateRecipe(req, res) {
  const idRecipe = req.params.idRecipe;
  const params = req.body;

  try {
    const recipeUpdated = await Recipe.findByIdAndUpdate(idRecipe, params);

    if (!recipeUpdated) {
      res.status(400).send({ msg: "No se ha podido actualizar la receta" });
    } else {
      res.status(200).send({ msg: "Receta actualizada" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Obtener todas las recetas que no contienen un alérgeno específico
async function getRecipesWithoutAllergens(req, res) {
    const alergenos = req.params.alergenos.split(','); // Convierte la cadena en un array

    try {
        const recipes = await Recipe.find({ alergenos: { $nin: alergenos } });
        res.status(200).send(recipes);
    } catch (error) {
        res.status(500).send(error);
    }
}


//Eliminar tarea
async function deleteRecipe(req, res) {
  const idRecipe = req.params.idRecipe;

  try {
    const recipe = await Recipe.findByIdAndDelete(idRecipe);

    if (!recipe) {
      res.status(400).send({ msg: "No se ha podido eliminar la receta" });
    } else {
      res.status(200).send({ msg: "Receta eliminada" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
    createRecipe,
    getRecipes,
    getRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipesWithoutAllergens,
    getRecipesByName
};
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const recipeSchema = schema({
    nombre: {
        type: String,
        required: true, // Hace que el nombre sea obligatorio
        trim: true, // Elimina los espacios al principio y al final
        maxlength: 100 // Establece una longitud máxima para el nombre
    },
    ingredientes: {
        type: Map,
        of: String,
        required: true // Hace que el mapa de ingredientes sea obligatorio
    },
    alergenos: {
        type: [String],
        required: false, // Los alérgenos no son obligatorios
        default: [] // Por defecto, los alérgenos son un array vacío
    }
});

module.exports = mongoose.model("recipeModel", recipeSchema);
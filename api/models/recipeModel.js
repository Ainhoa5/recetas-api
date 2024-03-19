const mongoose = require("mongoose");
const schema = mongoose.Schema;
const recipeSchema = schema({
    nombre:{
        type: String,
        required: true
    },
    ingredientes:{
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    alergenos:{
        type: [String],
        required: false,
    }
});

module.exports = mongoose.model("recipeModel", recipeSchema);
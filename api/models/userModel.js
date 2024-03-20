const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = schema({
    nombre:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("userModel", userSchema);
const mongoose = require("mongoose");
require('dotenv').config();// Considera usar variables de entorno para esto

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("La conexión a la base de datos es correcta");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1); // Detiene la ejecución del servidor si no puede conectarse a la base de datos
  }
};

module.exports = connectDatabase;

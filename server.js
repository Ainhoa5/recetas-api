require('dotenv').config(); // Si decides usar variables de entorno
const app = require("./app");
const connectDatabase = require("./config/database");
const port = process.env.PORT || 3000;

connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Servidor del API Rest funcionando en http://localhost:${port}`);
  });
});


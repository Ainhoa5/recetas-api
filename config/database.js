const mongoose = require("mongoose");
const app = require("../app");
const port = process.env.PORT || 3977;
const urlMongoDB = "mongodb+srv://carlosaldea33:smr1234@elprimercluster.aqrfnxw.mongodb.net/apiRecipes";

mongoose.connect(urlMongoDB)
  .then(() => {
    console.log("La conexión a la base de datos es correcta");

    app.listen(port, () => {
      console.log("Servidor del API Rest funcionando en http://localhost:${port}");
    });
  })
  .catch((error) => {
    console.error(error);
  });
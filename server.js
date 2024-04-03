require("dotenv").config();
const https = require("https");
const fs = require("fs");
const app = require("./app");
const connectDatabase = require("./config/database");
const port = process.env.PORT || 3977;

// Lea los archivos del certificado y la clave
const path = require("path");
const privateKey = fs.readFileSync(path.join(__dirname, "cert", "key.pem"));
const certificate = fs.readFileSync(path.join(__dirname, "cert", "cert.pem"));

const credentials = { key: privateKey, cert: certificate };

connectDatabase().then(() => {
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(port, () => {
    console.log(
      `Servidor del API Rest funcionando en https://localhost:${port}`
    );
  });
});

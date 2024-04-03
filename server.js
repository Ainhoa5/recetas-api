require("dotenv").config();
const express = require("express");
const app = require("./app");
const connectDatabase = require("./config/database");
const port = process.env.PORT || 3977;

connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(
      `Servidor del API Rest funcionando en http://localhost:${port}`
    );
  });
});

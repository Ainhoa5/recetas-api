// server.js
const http = require('http'); // permite crear servidores HTTP
const app = require('./app'); // configuraciones de la API
const port = process.env.PORT || 3000; // Definir el puerto con el que trabajar
const server = http.createServer(app); // Creamos un servidor HTTP que utiliza la aplicación Express para manejar solicitudes

server.listen(port);

const express = require("express");
const server = express();
const routes = require("./routes.js");
const path = require("path");

// usando template engine
server.set("view engine", "ejs");

// Mudar a localização da pasta views
server.set("views", path.join(__dirname, "views"));

// habilitar arquivos statics
server.use(express.static("public"));

// Usar o raq.body
server.use(express.urlencoded({ extended: true }));

// routes
server.use(routes);

server.listen(3000, () => console.log("Rodando"));

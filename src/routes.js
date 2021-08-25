const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const profile = {
  name: "Hartye",
  avatar: "https://avatars.githubusercontent.com/u/86665231?v=4",
  "month-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 2,
  "vacation-per-year": 6,
};

// req(request), res(response)
routes.get("/", (req, res) => res.render(views + "index"));
routes.get("/job", (req, res) => res.render(views + "job"));
routes.get("/job/edit", (req, res) => res.render(views + "job-edit"));
routes.get("/profile", (req, res) => res.render(views + "profile", { profile }));

// Mesma idéia de exportar uma função, module é uma propriedade de express.
module.exports = routes;
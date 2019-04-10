const express = require("express");
const path = require("path");
const db = require("./database/index");

const app = express();

app.use(express.static(path.join(__dirname, "/../client/dist")));

app.get("/homes", (req, res) => {
  db.getAllHomes((err, data) => {
    res.send(data);
  });
});

module.exports = app;

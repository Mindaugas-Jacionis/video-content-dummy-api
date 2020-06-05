const express = require("express");
const data = require("./data");

const content = express.Router();

content.get("/plans", function (req, res) {
  res.json(data);
});

module.exports = content;

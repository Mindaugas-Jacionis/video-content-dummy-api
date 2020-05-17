const express = require("express");

const auth = require("../auth");
const data = require("./data");

const content = express.Router();

function getFreeContent() {
  return data.filter(({ free }) => free);
}

content.get("/free-items", function (req, res) {
  res.json(getFreeContent());
});

content.get("/items", function (req, res) {
  const { authorization } = req.headers;
  const json = auth.tokenIsValid(authorization) ? data : getFreeContent();

  res.json(json);
});

content.get("/items/:itemId", function (req, res) {
  const { itemId } = req.params;
  const { authorization } = req.headers;
  const item = data.find(({ id }) => itemId === id);

  if (!item) {
    res.status(404).json({ message: "Content piece not found" });
  } else if (auth.tokenIsValid(authorization) || item.free) {
    res.json(item);
  } else {
    res.status(401).json({ message: "Access denied!" });
  }
});

module.exports = content;

const express = require("express");
const data = require("./data");

const sales = express.Router();

let subscriptions = [];

sales.get("/plans", function (req, res) {
  res.json(data);
});

sales.addSubscription = ({ userId, planId }) => {
  subscriptions = subscriptions.concat({ userId, items: [planId] });
  console.log("addSubscription", subscriptions, userId);
};

sales.updateSubscriptions = ({ userId, planId }) => {
  const userSubIndex = subscriptions.findIndex((sub) => sub.userId === userId);

  subscriptions[userSubIndex].items = subscriptions[userSubIndex].items.concat(planId);
  console.log("updateSubscriptions", subscriptions, userId);
};

module.exports = sales;

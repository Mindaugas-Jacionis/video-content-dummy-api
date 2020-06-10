const express = require("express");
const { v4 } = require("uuid");

const sales = require("../sales");

const auth = express.Router();

const CREDENTIALS = {
  username: "tester",
  password: "netflix",
  id: 0,
};

const tokens = [];
const users = [CREDENTIALS];

function cleanup(tokenToDelete) {
  tokens.filter(({ timestamp, token }) => {
    const tooOld = (Date.now() - timestamp) / (1000 * 60 * 60 * 24) < 1; // older than 1 day

    return tooOld || token === tokenToDelete;
  });
}

function registerToken() {
  const now = Date.now();
  const token = `${v4()}-${now}`;

  tokens.push({ token, timestamp: now });

  return token;
}

auth.post("/login", function (req, res) {
  const { username, password } = req.body;
  const isCorrect = users.some(
    (existing) => username === existing.username && password === existing.password
  );

  if (isCorrect) {
    res.json({ token: registerToken() });
  } else {
    res.status(400).json({ message: "Bad credentials!" });
  }

  cleanup();
});

auth.post("/signup", function (req, res) {
  const { username, password, planId } = req.body;

  if (!username || !password || !planId) {
    let errors = [
      !username && "Username missing",
      !password && "Password missing",
      !planId && "Plan is missing",
    ].filter(Boolean);

    res.status(400).json({ errors });
  } else {
    const userIndex = users.findIndex(
      ({ username: existingUsername }) => existingUsername === username
    );
    const exist = userIndex > -1;

    if (exist) {
      users[userIndex] = { ...users[userIndex], password };
      sales.updateSubscriptions({ userId: users[userIndex].id, planId });
    } else {
      const userId = users.length;

      users.push({ id: userId, username, password });
      sales.addSubscription({ userId, planId });
    }

    res.json({
      message: exist ? "User subscriptions updated successfully" : "User created successfully",
      token: registerToken(),
      exist,
    });
  }
});

auth.post("/logout", function (req, res) {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ message: "Token missing!" });
  } else {
    res.sendStatus(201);
  }

  cleanup(token);
});

auth.tokenIsValid = (providedToken) => {
  cleanup();

  return tokens.some(({ token }) => providedToken === token);
};

module.exports = auth;

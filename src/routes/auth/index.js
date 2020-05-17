const express = require("express");
const { v4 } = require("uuid");

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
  const { username, password } = req.body;

  if (!username || !password) {
    if (!username && password) {
      res.status(400).json({ message: "Username missing" });
    }

    if (!password && username) {
      res.status(400).json({ message: "Password missing" });
    }
  } else {
    if (users.some(({ username: existingUsername }) => existingUsername === username)) {
      res.status(400).json({ message: "User already exists" });
    } else {
      users.push({ id: users.length, username, password });
      res.json({ message: "User created successfully", token: registerToken() });
      console.log("users", users);
    }
  }
});

auth.post("/logout", function (req, res) {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ message: "Token missing!" });
  } else {
    res.status(201);
  }

  cleanup(token);
});

auth.tokenIsValid = (providedToken) => {
  cleanup();

  return tokens.some(({ token }) => providedToken === token);
};

module.exports = auth;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const flatten = require("lodash.flatten");

const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3003;

app.use(bodyParser.json()); // for parsing application/json
app.use(cors());

Object.entries(routes).forEach(([name, route]) => {
  app.use(`/${name}`, route);
});

app.get("/", function (req, res) {
  const allRoutes = flatten(
    Object.keys(routes).map((route) => {
      return routes[route].stack.map(
        ({ route: { path, stack } }) => `${stack[0].method}: /${route}${path}`
      );
    })
  );

  res.send(allRoutes.join("<br />"));
});

app.listen(port, () => {
  console.log(`Server running @ http://127.0.0.1:${port}/`);
});

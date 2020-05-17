// reads json created by grab-movieo-content.js

const fs = require("fs");
const { v4 } = require("uuid");

const output = JSON.parse(fs.readFileSync("./data-input.json", "utf8")).map((movie) => ({
  ...movie,
  id: `${v4().slice(0, 6)}-${movie.title.split(" ")[0]}-${v4().slice(0, 6)}`,
  image: movie.image.split("208x310/")[1].replace(/^http:\/\//, "https://"),
}));

fs.writeFileSync("./src/routes/content/data.json", JSON.stringify(output));

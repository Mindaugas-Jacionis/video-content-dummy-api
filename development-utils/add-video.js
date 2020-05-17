// add vidoes when added

const fs = require("fs");

console.log(JSON.parse(fs.readFileSync("./data.json", "utf8")).filter(({ video }) => !video));

const output = JSON.parse(fs.readFileSync("./data.json", "utf8")).map((movie) => ({
  ...movie,
  video: `https://www.youtube.com/embed/${movie.video}`,
  free: parseInt(Math.random() * 100, 10) < 20,
}));

fs.writeFileSync("./src/routes/content/data.json", JSON.stringify(output));

// Grabs content from DOM

const items = document.querySelectorAll(".grid-movie-inner");

JSON.stringify(
  [...items].map((item) => ({
    title: item.querySelector(".movie-info .title .name").textContent,
    image: item.querySelector(".poster-cont").dataset.src,
    description: item.querySelector(".movie-info .middle .overview").textContent,
  }))
);

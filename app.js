function openMenu() {
  document.body.classList += " menu--open"
}

function closeMenu() {
  document.body.classList.remove("menu--open")
}

async function main() {
  const response = await fetch(
    "https://www.omdbapi.com/?apikey=88b32aac&s=friends",
  );
  const moviesData = await response.json();

  const movielistEl = document.querySelector(".movie-list");

  movielistEl.innerHTML = moviesData.Search.map(
    (movie) => `
      <div class="movie-card">
        <div class="movie-card__container">
          <h3>${movie.Title}</h3>
          <p><b>Poster:</b></p> <img src="${movie.Poster}">
          <p><b>Year:</b> ${movie.Year}</p>
          <p><b>Type:</b> ${movie.Type}</p>
          <p><b>imdbID:</b> ${movie.imdbID}</p>
        </div>
      </div>
    `,
  ).join("");
}

main();

let currentMovies = [];

async function searchMovies(event) {
  const searchTerm = event.target.value;
  if (!searchTerm) return;
  const response = await fetch(`https://www.omdbapi.com/?apikey=88b32aac&s=${searchTerm}`);
  const moviesData = await response.json();
  currentMovies = moviesData.Search || [];
  renderMovies(currentMovies);
}

function filterMovies(event) {
  const sorted = [...currentMovies];
  if (event.target.value === "OLD_TO_NEW") sorted.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  else if (event.target.value === "NEW_TO_OLD") sorted.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  else if (event.target.value === "A_TO_Z") sorted.sort((a, b) => a.Title.localeCompare(b.Title));
  else if (event.target.value === "Z_TO_A") sorted.sort((a, b) => b.Title.localeCompare(a.Title));
  renderMovies(sorted);
}

function renderMovies(movies) {
  document.querySelector(".movie-list").innerHTML = movies.map(movie => `
    <div class="movie-card"><div class="movie-card__container">
      <h3>${movie.Title}</h3>
      <p><b>Poster:</b></p><img src="${movie.Poster}">
      <p><b>Year:</b> ${movie.Year}</p>
      <p><b>Type:</b> ${movie.Type}</p>
      <p><b>imdbID:</b> ${movie.imdbID}</p>
    </div></div>`).join("") || "<p>No results found.</p>";
}


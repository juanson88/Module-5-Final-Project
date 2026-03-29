async function searchMovies(event) {
  const searchTerm = event.target.value;
  if (!searchTerm) return;

  const response = await fetch(
    `https://www.omdbapi.com/?apikey=88b32aac&s=${searchTerm}`,
  );
  const moviesData = await response.json();
  const movielistEl = document.querySelector(".movie-list");

  movielistEl.innerHTML =
    moviesData.Search?.map(
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
    ).join("") || "<p>No results found.</p>";
}
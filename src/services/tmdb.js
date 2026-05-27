const BASE_URL = "https://api.themoviedb.org/3";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const DEFAULT_PARAMS = { language: "es-ES" };

async function fetchTMDB(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);

  Object.entries({ ...DEFAULT_PARAMS, ...params }).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export const tmdb = {
  getPopularMovies: (page = 1) =>
    fetchTMDB("/movie/popular", { page }),

  searchMovies: (query, page = 1) =>
    fetchTMDB("/search/movie", { query, page }),

  getMoviesByGenre: (genreId, page = 1) =>
    fetchTMDB("/discover/movie", { with_genres: genreId, page }),

  getGenres: () =>
    fetchTMDB("/genre/movie/list"),

  getMovieDetail: (id) =>
    fetchTMDB(`/movie/${id}`, { append_to_response: "credits,videos" }),

  getActorDetail: (id) =>
    fetchTMDB(`/person/${id}`, { append_to_response: "movie_credits" }),

  getImageUrl: (path, size = "w500") =>
    path ? `${BASE_IMAGE_URL}/${size}${path}` : null,
};

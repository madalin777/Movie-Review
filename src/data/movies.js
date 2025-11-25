// Comprehensive movie database with detailed information
// All images are from TMDB (The Movie Database)
export const movies = [
  // ===== 2024 RELEASES =====
  
];

// Export helper pentru a obține filmele sortate
export const getMoviesByYear = (year) => {
  return movies.filter(movie => movie.year === year).sort((a, b) => b.rating - a.rating);
};

export const getMoviesByGenre = (genre) => {
  return movies.filter(movie => movie.genres.includes(genre));
};

export const getTopRatedMovies = (limit = 10) => {
  return [...movies].sort((a, b) => b.rating - a.rating).slice(0, limit);
};

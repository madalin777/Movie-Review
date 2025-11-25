import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, sortBy, onSortChange }) => {
  const sortedMovies = [...movies].sort((a, b) => {
    switch (sortBy) {
      case 'rating-desc':
        return b.rating - a.rating;
      case 'rating-asc':
        return a.rating - b.rating;
      case 'year-desc':
        return b.year - a.year;
      case 'year-asc':
        return a.year - b.year;
      case 'votes-desc':
        return b.votes - a.votes;
      default:
        return 0;
    }
  });

  if (sortedMovies.length === 0) {
    return (
      <div className="movie-list-empty">
        <p>Nu s-au găsit filme care să corespundă criteriilor tale.</p>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <div className="movie-list-header">
        <h2 className="movie-list-title">
          {sortedMovies.length} {sortedMovies.length === 1 ? 'film' : 'filme'} găsite
        </h2>
        <div className="movie-list-sort">
          <label htmlFor="sort-select" className="sr-only">
            Sortează după
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select"
          >
            <option value="rating-desc">Rating (cel mai mare)</option>
            <option value="rating-asc">Rating (cel mai mic)</option>
            <option value="year-desc">An (cel mai recent)</option>
            <option value="year-asc">An (cel mai vechi)</option>
            <option value="votes-desc">Cele mai populare</option>
          </select>
        </div>
      </div>
      <div className="movie-list">
        {sortedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;


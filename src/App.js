import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import { movies } from './data/movies';
import './App.css';

const HomePage = ({
  searchQuery,
  onSearchChange,
  featuredMovie,
  allGenres,
  selectedGenres,
  onGenreToggle,
  onClearGenres,
  movies,
  sortBy,
  onSortChange,
}) => (
  <div className="app-container">
    <Header
      query={searchQuery}
      onQueryChange={onSearchChange}
      featuredMovie={featuredMovie}
    />
    <main className="main-content">
      {allGenres.length > 0 && (
        <div className="genre-filter">
          <h3 className="genre-filter__title">Filtrează după gen:</h3>
          <div className="genre-filter__tags">
            {allGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => onGenreToggle(genre)}
                className={`genre-tag ${
                  selectedGenres.includes(genre) ? 'genre-tag--active' : ''
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
          {selectedGenres.length > 0 && (
            <button onClick={onClearGenres} className="genre-filter__clear">
              Șterge filtrele
            </button>
          )}
        </div>
      )}
      <MovieList movies={movies} sortBy={sortBy} onSortChange={onSortChange} />
    </main>
  </div>
);

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating-desc');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [userReviews, setUserReviews] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('movieReviews');
    return saved ? JSON.parse(saved) : {};
  });

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('movieReviews', JSON.stringify(userReviews));
  }, [userReviews]);

  // Extract unique genres
  const allGenres = useMemo(() => {
    const genres = new Set();
    movies.forEach((movie) => {
      movie.genres.forEach((genre) => genres.add(genre));
    });
    return Array.from(genres).sort();
  }, []);

  // Filter and search movies
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch =
        searchQuery === '' ||
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(movie.cast) && movie.cast.some((actor) => {
          if (typeof actor === 'string') {
            return actor.toLowerCase().includes(searchQuery.toLowerCase());
          } else if (actor && actor.name) {
            return actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   (actor.character && actor.character.toLowerCase().includes(searchQuery.toLowerCase()));
          }
          return false;
        })) ||
        movie.genres.some((genre) =>
          genre.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesGenres =
        selectedGenres.length === 0 ||
        selectedGenres.some((genre) => movie.genres.includes(genre));

      return matchesSearch && matchesGenres;
    });
  }, [searchQuery, selectedGenres]);

  // Get featured movie (highest rated)
  const featuredMovie = useMemo(() => {
    if (filteredMovies.length === 0) return null;
    return filteredMovies.reduce((prev, current) =>
      current.rating > prev.rating ? current : prev
    );
  }, [filteredMovies]);

  const handleGenreToggle = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleAddReview = (movieId, review) => {
    setUserReviews((prev) => {
      const movieReviews = prev[movieId] || [];
      return {
        ...prev,
        [movieId]: [...movieReviews, review],
      };
    });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              featuredMovie={featuredMovie}
              allGenres={allGenres}
              selectedGenres={selectedGenres}
              onGenreToggle={handleGenreToggle}
              onClearGenres={() => setSelectedGenres([])}
              movies={filteredMovies}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetail
              movies={movies}
              userReviews={userReviews}
              onAddReview={handleAddReview}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import MovieList from './components/MovieList.js';
import MovieDetail from './components/MovieDetail.js';
import { movies } from './data/movies.js';
import './App.css';

// TMDB API Configuration
const TMDB_API_KEY = 'e5e15f63733c8b113d86026d6045f222';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

// Mapare genuri TMDB ID -> Nume în Română
const GENRE_MAP = {
  28: 'Acțiune',
  12: 'Aventură',
  16: 'Animație',
  35: 'Comedie',
  80: 'Crimă',
  99: 'Documentar',
  18: 'Dramă',
  10751: 'Familie',
  14: 'Fantasy',
  36: 'Istoric',
  27: 'Horror',
  10402: 'Muzical',
  9648: 'Mister',
  10749: 'Romantic',
  878: 'SF',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'Război',
  37: 'Western'
};

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
  onFetchMovies,
  loading,
}) => (
  <div className="app-container">
    <Header
      query={searchQuery}
      onQueryChange={onSearchChange}
      featuredMovie={featuredMovie}
    />
    <main className="main-content">
      {/* Buton pentru a adăuga filme din TMDB */}
      <div style={{ 
        padding: '20px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        marginBottom: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <button 
          onClick={onFetchMovies} 
          disabled={loading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'white',
            background: loading ? '#999' : '#ff6b6b',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transform: loading ? 'none' : 'scale(1)',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.transform = 'translateY(-2px) scale(1.02)';
              e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
          }}
        >
          {loading ? '⏳ Se încarcă filme din TMDB...' : '🎬 Adaugă 10 filme populare din TMDB'}
        </button>
        {loading && (
          <p style={{ marginTop: '10px', color: 'white', fontSize: '14px' }}>
            Așteptați, se încarcă detaliile filmelor...
          </p>
        )}
      </div>

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
  const [allMovies, setAllMovies] = useState(movies);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [userReviews, setUserReviews] = useState(() => {
    const saved = localStorage.getItem('movieReviews');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('movieReviews', JSON.stringify(userReviews));
  }, [userReviews]);

  // Funcție pentru a aduce filme de pe TMDB
  const fetchMoviesFromTMDB = async () => {
    if (!TMDB_API_KEY || TMDB_API_KEY === 'PUNE_CHEIA_TA_API_AICI') {
      alert('❌ Te rog adaugă cheia TMDB API în cod!\n\nObține-o gratuit de pe:\nhttps://www.themoviedb.org/settings/api');
      return;
    }

    setLoading(true);
    try {
      // 1. Fetch popular movies
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=ro-RO&page=${currentPage}`
      );
      
      if (!response.ok) {
        throw new Error('Eroare la încărcarea filmelor de pe TMDB');
      }

      const data = await response.json();
      
      // 2. Fetch details pentru fiecare film (cast și director)
      const detailedMovies = await Promise.all(
        data.results.slice(0, 10).map(async (movie) => {
          try {
            // Fetch movie credits (cast & crew)
            const creditsResponse = await fetch(
              `${TMDB_BASE_URL}/movie/${movie.id}/credits?api_key=${TMDB_API_KEY}`
            );
            const credits = await creditsResponse.json();
            
            // Găsește regizorul
            const director = credits.crew?.find(person => person.job === 'Director');
            
            // Primii 5 actori
            const cast = credits.cast?.slice(0, 5).map(actor => ({
              name: actor.name,
              character: actor.character
            })) || [];

            // Returnează filmul în formatul aplicației tale
            return {
              id: `tmdb-${movie.id}`,
              title: movie.title,
              year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
              rating: Math.round(movie.vote_average * 10) / 10,
              votes: movie.vote_count,
              genres: movie.genre_ids?.map(id => GENRE_MAP[id]).filter(Boolean) || ['N/A'],
              director: director?.name || 'N/A',
              cast: cast,
              plot: movie.overview || 'Fără descriere disponibilă.',
              poster: movie.poster_path 
                ? `${TMDB_IMAGE_BASE}${movie.poster_path}` 
                : 'https://via.placeholder.com/500x750?text=No+Poster',
            };
          } catch (error) {
            console.error(`Eroare la încărcarea detaliilor pentru ${movie.title}:`, error);
            return null;
          }
        })
      );

      // Filtrează filmele valide
      const validMovies = detailedMovies.filter(Boolean);
      
      // Adaugă filmele noi (evită duplicate)
      setAllMovies(prev => {
        const existingIds = new Set(prev.map(m => m.id));
        const newMovies = validMovies.filter(m => !existingIds.has(m.id));
        return [...prev, ...newMovies];
      });
      
      // Incrementează pagina pentru următoarea încărcare
      setCurrentPage(prev => prev + 1);
      
      alert(`✅ ${validMovies.length} filme au fost adăugate cu succes din TMDB!`);
      
    } catch (error) {
      console.error('Eroare la încărcarea filmelor din TMDB:', error);
      alert('❌ A apărut o eroare la încărcarea filmelor.\n\nVerifică:\n- Cheia API este corectă\n- Ai conexiune la internet\n- Consola pentru mai multe detalii');
    } finally {
      setLoading(false);
    }
  };

  // Extract unique genres din toate filmele
  const allGenres = useMemo(() => {
    const genres = new Set();
    allMovies.forEach((movie) => {
      movie.genres.forEach((genre) => genres.add(genre));
    });
    return Array.from(genres).sort();
  }, [allMovies]);

  // Filter and search movies
  const filteredMovies = useMemo(() => {
    return allMovies.filter((movie) => {
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
  }, [searchQuery, selectedGenres, allMovies]);

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
              onFetchMovies={fetchMoviesFromTMDB}
              loading={loading}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetail
              movies={allMovies}
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

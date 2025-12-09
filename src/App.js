import React, { useState, useMemo, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/screens/HomeScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import { movies } from './src/data/movies';

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

const Stack = createNativeStackNavigator();

function App() {
  const [allMovies, setAllMovies] = useState(movies);
  const [userReviews, setUserReviews] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Load reviews from AsyncStorage
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const saved = await AsyncStorage.getItem('movieReviews');
        if (saved) {
          setUserReviews(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
      }
    };
    loadReviews();
  }, []);

  // Save reviews to AsyncStorage
  useEffect(() => {
    const saveReviews = async () => {
      try {
        await AsyncStorage.setItem('movieReviews', JSON.stringify(userReviews));
      } catch (error) {
        console.error('Error saving reviews:', error);
      }
    };
    saveReviews();
  }, [userReviews]);

  // Funcție pentru a aduce filme de pe TMDB
  const fetchMoviesFromTMDB = async () => {
    if (!TMDB_API_KEY || TMDB_API_KEY === 'PUNE_CHEIA_TA_API_AICI') {
      alert('❌ Te rog adaugă cheia TMDB API în cod!\n\nObține-o gratuit de pe:\nhttps://www.themoviedb.org/settings/api');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=ro-RO&page=${currentPage}`
      );
      
      if (!response.ok) {
        throw new Error('Eroare la încărcarea filmelor de pe TMDB');
      }

      const data = await response.json();
      
      const detailedMovies = await Promise.all(
        data.results.slice(0, 10).map(async (movie) => {
          try {
            const creditsResponse = await fetch(
              `${TMDB_BASE_URL}/movie/${movie.id}/credits?api_key=${TMDB_API_KEY}`
            );
            const credits = await creditsResponse.json();
            
            const director = credits.crew?.find(person => person.job === 'Director');
            
            const cast = credits.cast?.slice(0, 5).map(actor => ({
              name: actor.name,
              character: actor.character
            })) || [];

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

      const validMovies = detailedMovies.filter(Boolean);
      
      setAllMovies(prev => {
        const existingIds = new Set(prev.map(m => m.id));
        const newMovies = validMovies.filter(m => !existingIds.has(m.id));
        return [...prev, ...newMovies];
      });
      
      setCurrentPage(prev => prev + 1);
      
      alert(`✅ ${validMovies.length} filme au fost adăugate cu succes din TMDB!`);
      
    } catch (error) {
      console.error('Eroare la încărcarea filmelor din TMDB:', error);
      alert('❌ A apărut o eroare la încărcarea filmelor.\n\nVerifică:\n- Cheia API este corectă\n- Ai conexiune la internet\n- Consola pentru mai multe detalii');
    } finally {
      setLoading(false);
    }
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
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#f59e0b',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          options={{ title: 'MovieReview' }}
        >
          {(props) => (
            <HomeScreen
              {...props}
              allMovies={allMovies}
              onFetchMovies={fetchMoviesFromTMDB}
              loading={loading}
            />
          )}
        </Stack.Screen>
        <Stack.Screen 
          name="MovieDetail" 
          options={{ title: 'Detalii Film' }}
        >
          {(props) => (
            <MovieDetailScreen
              {...props}
              allMovies={allMovies}
              userReviews={userReviews}
              onAddReview={handleAddReview}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


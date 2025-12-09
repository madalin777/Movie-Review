import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import MovieList from '../components/MovieList';

const HomeScreen = ({ navigation, allMovies, onFetchMovies, loading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating-desc');
  const [selectedGenres, setSelectedGenres] = useState([]);

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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header
          query={searchQuery}
          onQueryChange={setSearchQuery}
          featuredMovie={featuredMovie}
        />

        <View style={styles.mainContent}>
          {/* Buton pentru a adăuga filme din TMDB */}
          <View style={styles.fetchButtonContainer}>
            <TouchableOpacity
              onPress={onFetchMovies}
              disabled={loading}
              style={[styles.fetchButton, loading && styles.fetchButtonDisabled]}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.fetchButtonText}>
                  🎬 Adaugă 10 filme populare din TMDB
                </Text>
              )}
            </TouchableOpacity>
            {loading && (
              <Text style={styles.loadingText}>
                Așteptați, se încarcă detaliile filmelor...
              </Text>
            )}
          </View>

          {allGenres.length > 0 && (
            <View style={styles.genreFilter}>
              <Text style={styles.genreFilterTitle}>Filtrează după gen:</Text>
              <View style={styles.genreFilterTags}>
                {allGenres.map((genre) => (
                  <TouchableOpacity
                    key={genre}
                    onPress={() => handleGenreToggle(genre)}
                    style={[
                      styles.genreTag,
                      selectedGenres.includes(genre) && styles.genreTagActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.genreTagText,
                        selectedGenres.includes(genre) && styles.genreTagTextActive,
                      ]}
                    >
                      {genre}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {selectedGenres.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSelectedGenres([])}
                  style={styles.clearGenresButton}
                >
                  <Text style={styles.clearGenresText}>Șterge filtrele</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <MovieList
            movies={filteredMovies}
            sortBy={sortBy}
            onSortChange={setSortBy}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  mainContent: {
    padding: 20,
  },
  fetchButtonContainer: {
    padding: 20,
    backgroundColor: '#667eea',
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  fetchButton: {
    padding: 12,
    backgroundColor: '#ff6b6b',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  fetchButtonDisabled: {
    backgroundColor: '#999',
  },
  fetchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 14,
  },
  genreFilter: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2d2d2d',
  },
  genreFilterTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#f59e0b',
    fontWeight: '700',
  },
  genreFilterTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  genreTag: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#2d2d2d',
  },
  genreTagActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  genreTagText: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '600',
  },
  genreTagTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  clearGenresButton: {
    padding: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#64748b',
    borderRadius: 25,
    alignItems: 'center',
  },
  clearGenresText: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeScreen;


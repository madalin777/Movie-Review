import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MovieCard from './MovieCard';

const MovieList = ({ movies, sortBy, onSortChange, navigation }) => {
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
        return (b.votes || 0) - (a.votes || 0);
      default:
        return 0;
    }
  });

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetail', { movieId: movie.id });
  };

  if (sortedMovies.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          Nu s-au găsit filme care să corespundă criteriilor tale.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {sortedMovies.length} {sortedMovies.length === 1 ? 'film' : 'filme'} găsite
        </Text>
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sortează:</Text>
          <View style={styles.sortButtons}>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'rating-desc' && styles.sortButtonActive]}
              onPress={() => onSortChange('rating-desc')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'rating-desc' && styles.sortButtonTextActive]}>
                Rating ↓
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'year-desc' && styles.sortButtonActive]}
              onPress={() => onSortChange('year-desc')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'year-desc' && styles.sortButtonTextActive]}>
                An ↓
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'votes-desc' && styles.sortButtonActive]}
              onPress={() => onSortChange('votes-desc')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'votes-desc' && styles.sortButtonTextActive]}>
                Voturi ↓
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.list}>
        {sortedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onPress={() => handleMoviePress(movie)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#f59e0b',
    marginBottom: 15,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  sortLabel: {
    fontSize: 14,
    color: '#cbd5e1',
    fontWeight: '600',
  },
  sortButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sortButton: {
    padding: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderColor: '#2d2d2d',
    borderRadius: 12,
  },
  sortButtonActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  sortButtonText: {
    fontSize: 12,
    color: '#cbd5e1',
    fontWeight: '600',
  },
  sortButtonTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    paddingBottom: 20,
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#cbd5e1',
    fontSize: 16,
  },
});

export default MovieList;

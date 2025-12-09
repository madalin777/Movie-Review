import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getFallbackImage } from '../utils/tmdbImages';

const MovieCard = ({ movie, onPress }) => {
  const [imageError, setImageError] = useState(false);

  const formatRating = (rating) => {
    return rating.toFixed(1);
  };

  const getRatingColor = (rating) => {
    if (rating >= 8.5) return '#10b981';
    if (rating >= 7.5) return '#22c55e';
    if (rating >= 6.0) return '#f59e0b';
    return '#ef4444';
  };

  const posterSrc = imageError || !movie.poster 
    ? getFallbackImage(movie.title, 500, 750) 
    : movie.poster;

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.posterContainer}>
        <Image
          source={{ uri: posterSrc }}
          style={styles.poster}
          onError={() => setImageError(true)}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <View style={[styles.rating, { borderColor: getRatingColor(movie.rating) }]}>
            <Text style={[styles.ratingValue, { color: getRatingColor(movie.rating) }]}>
              {formatRating(movie.rating)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
        <View style={styles.meta}>
          <Text style={styles.year}>{movie.year}</Text>
          {movie.runtime && (
            <Text style={styles.runtime}>{movie.runtime} min</Text>
          )}
        </View>
        <View style={styles.genres}>
          {movie.genres.slice(0, 3).map((genre, index) => (
            <View key={index} style={styles.genre}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.votes}>{movie.votes?.toLocaleString() || 0} voturi</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2d2d2d',
    marginBottom: 20,
    width: '48%',
  },
  posterContainer: {
    width: '100%',
    aspectRatio: 2 / 3,
    position: 'relative',
    backgroundColor: '#1a1a1a',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 15,
  },
  rating: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderWidth: 2,
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#f8fafc',
  },
  meta: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  year: {
    fontSize: 14,
    color: '#cbd5e1',
    fontWeight: '600',
  },
  runtime: {
    fontSize: 14,
    color: '#cbd5e1',
    fontWeight: '600',
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  genre: {
    padding: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    borderRadius: 6,
  },
  genreText: {
    fontSize: 11,
    color: '#fbbf24',
    fontWeight: '600',
  },
  votes: {
    fontSize: 12,
    color: '#64748b',
  },
});

export default MovieCard;

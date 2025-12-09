import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import ReviewForm from '../components/ReviewForm';
import TrailerPlayer from '../components/TrailerPlayer';
import { getFallbackImage, getFallbackBackdrop } from '../utils/tmdbImages';

const MovieDetailScreen = ({ allMovies, userReviews, onAddReview }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { movieId } = route.params;
  const movie = allMovies.find((m) => m.id === movieId);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [posterError, setPosterError] = useState(false);
  const [backdropError, setBackdropError] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    description: false,
    cast: false,
    trivia: false,
    quotes: false,
  });

  if (!movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Filmul nu a fost găsit</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Înapoi la listă</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const allReviews = [
    ...(movie.reviews || []),
    ...(userReviews[movie.id] || []),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const calculateAverageRating = () => {
    if (allReviews.length === 0) return movie.rating;
    const sum = allReviews.reduce((acc, review) => acc + review.score, 0);
    return sum / allReviews.length;
  };

  const averageRating = calculateAverageRating();
  const totalVotes = (movie.votes || 0) + (userReviews[movie.id]?.length || 0);

  const formatRating = (rating) => rating.toFixed(1);
  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 8.5) return '#10b981';
    if (rating >= 7.5) return '#22c55e';
    if (rating >= 6.0) return '#f59e0b';
    return '#ef4444';
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const displayedReviews = showAllReviews
    ? allReviews
    : allReviews.slice(0, 3);

  const backdropUrl = backdropError || !movie.backdrop 
    ? getFallbackBackdrop(movie.title, 1280, 720) 
    : movie.backdrop;
  const posterUrl = posterError || !movie.poster 
    ? getFallbackImage(movie.title, 500, 750) 
    : movie.poster;

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.hero, { backgroundColor: '#1a1a1a' }]}>
        <Image
          source={{ uri: backdropUrl }}
          style={styles.backdrop}
          resizeMode="cover"
          onError={() => setBackdropError(true)}
        />
        <View style={styles.heroOverlay}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Text style={styles.backBtnText}>← Înapoi</Text>
          </TouchableOpacity>
          <View style={styles.heroInfo}>
            <View style={styles.posterContainer}>
              <Image
                source={{ uri: posterUrl }}
                style={styles.poster}
                onError={() => setPosterError(true)}
                resizeMode="cover"
              />
              {movie.mpaaRating && (
                <View style={styles.mpaaRating}>
                  <Text style={styles.mpaaRatingText}>{movie.mpaaRating}</Text>
                </View>
              )}
            </View>
            <View style={styles.heroText}>
              <Text style={styles.title}>{movie.title}</Text>
              {movie.tagline && (
                <Text style={styles.tagline}>{movie.tagline}</Text>
              )}
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>{movie.year}</Text>
                {movie.runtime && (
                  <Text style={styles.metaText}>{formatRuntime(movie.runtime)}</Text>
                )}
                <View style={styles.genres}>
                  {movie.genres.map((genre, index) => (
                    <View key={index} style={styles.genre}>
                      <Text style={styles.genreText}>{genre}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={[styles.ratingValue, { color: getRatingColor(averageRating) }]}>
                  {formatRating(averageRating)}
                </Text>
                <Text style={styles.ratingLabel}>
                  / 10 ({totalVotes.toLocaleString()} voturi)
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {movie.trailer && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trailer</Text>
            <TrailerPlayer trailerUrl={movie.trailer} title={movie.title} />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sinopsis</Text>
          <Text style={styles.synopsis}>
            {movie.synopsis || movie.plot || 'Fără descriere disponibilă.'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Echipa</Text>
          <View style={styles.crew}>
            <View style={styles.crewItem}>
              <Text style={styles.crewLabel}>Regizor:</Text>
              <Text style={styles.crewValue}>{movie.director}</Text>
            </View>
            {movie.writers && movie.writers.length > 0 && (
              <View style={styles.crewItem}>
                <Text style={styles.crewLabel}>Scenariști:</Text>
                <Text style={styles.crewValue}>{movie.writers.join(', ')}</Text>
              </View>
            )}
            <View style={styles.crewItem}>
              <Text style={styles.crewLabel}>Distribuție:</Text>
              <Text style={styles.crewValue}>
                {Array.isArray(movie.cast) && movie.cast[0]?.name
                  ? movie.cast.map((actor) => `${actor.name} (${actor.character})`).join(', ')
                  : Array.isArray(movie.cast)
                  ? movie.cast.join(', ')
                  : movie.cast}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Recenzii ({allReviews.length})
            </Text>
          </View>
          <ReviewForm movieId={movie.id} onAddReview={onAddReview} />
          <View style={styles.reviews}>
            {displayedReviews.length === 0 ? (
              <Text style={styles.noReviews}>
                Nu există recenzii încă. Fii primul care adaugă o recenzie!
              </Text>
            ) : (
              displayedReviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewAuthor}>{review.author}</Text>
                    <Text style={styles.reviewDate}>{formatDate(review.date)}</Text>
                    <View style={[styles.reviewScore, { borderColor: getRatingColor(review.score) }]}>
                      <Text style={[styles.reviewScoreText, { color: getRatingColor(review.score) }]}>
                        {formatRating(review.score)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.reviewContent}>{review.content}</Text>
                </View>
              ))
            )}
            {allReviews.length > 3 && (
              <TouchableOpacity
                onPress={() => setShowAllReviews(!showAllReviews)}
                style={styles.showMoreButton}
              >
                <Text style={styles.showMoreText}>
                  {showAllReviews
                    ? 'Afișează mai puține recenzii'
                    : `Afișează toate cele ${allReviews.length} recenzii`}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  hero: {
    minHeight: 400,
    position: 'relative',
  },
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    paddingTop: 60,
    minHeight: 400,
  },
  backBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: '#f59e0b',
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backBtnText: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: '700',
  },
  heroInfo: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
  },
  posterContainer: {
    position: 'relative',
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#f59e0b',
  },
  mpaaRating: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#f59e0b',
  },
  mpaaRatingText: {
    color: '#f59e0b',
    fontWeight: '800',
    fontSize: 14,
  },
  heroText: {
    flex: 1,
    minWidth: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#f59e0b',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#cbd5e1',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  metaText: {
    fontSize: 14,
    color: '#cbd5e1',
    fontWeight: '600',
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genre: {
    padding: 8,
    backgroundColor: '#f59e0b',
    borderRadius: 20,
  },
  genreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    marginTop: 15,
  },
  ratingValue: {
    fontWeight: '900',
    fontSize: 32,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#cbd5e1',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2d2d2d',
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 15,
    color: '#f59e0b',
    fontWeight: '800',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    paddingLeft: 10,
  },
  synopsis: {
    fontSize: 16,
    lineHeight: 24,
    color: '#cbd5e1',
  },
  crew: {
    gap: 15,
  },
  crewItem: {
    flexDirection: 'row',
    gap: 15,
    flexWrap: 'wrap',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d2d2d',
  },
  crewLabel: {
    fontWeight: '700',
    color: '#f59e0b',
    minWidth: 100,
    fontSize: 14,
  },
  crewValue: {
    color: '#cbd5e1',
    flex: 1,
    fontSize: 14,
  },
  reviews: {
    gap: 20,
    marginTop: 20,
  },
  reviewCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2d2d2d',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 15,
  },
  reviewAuthor: {
    fontWeight: '700',
    color: '#f8fafc',
    fontSize: 16,
  },
  reviewDate: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
  },
  reviewScore: {
    fontWeight: '900',
    fontSize: 18,
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 2,
  },
  reviewScoreText: {
    fontWeight: '900',
    fontSize: 18,
  },
  reviewContent: {
    color: '#cbd5e1',
    lineHeight: 22,
    fontSize: 14,
  },
  noReviews: {
    textAlign: 'center',
    padding: 30,
    color: '#cbd5e1',
    fontStyle: 'italic',
    fontSize: 14,
  },
  showMoreButton: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderColor: '#2d2d2d',
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  showMoreText: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#0a0a0a',
  },
  errorTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#f8fafc',
    fontWeight: '800',
  },
  backButton: {
    padding: 15,
    backgroundColor: '#f59e0b',
    borderRadius: 12,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default MovieDetailScreen;


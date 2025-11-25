import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getFallbackImage } from '../utils/tmdbImages';

const MovieCard = ({ movie }) => {
  const [imageError, setImageError] = useState(false);

  const formatRating = (rating) => {
    return rating.toFixed(1);
  };

  const getRatingColor = (rating) => {
    if (rating >= 8.5) return 'rating-excellent';
    if (rating >= 7.5) return 'rating-good';
    if (rating >= 6.0) return 'rating-average';
    return 'rating-poor';
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const posterSrc = imageError || !movie.poster 
    ? getFallbackImage(movie.title, 500, 750) 
    : movie.poster;

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-card__poster-container">
        <img
          src={posterSrc}
          alt={`Poster pentru ${movie.title}`}
          className="movie-card__poster"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="movie-card__overlay">
          <div className={`movie-card__rating ${getRatingColor(movie.rating)}`}>
            <span className="movie-card__rating-value">
              {formatRating(movie.rating)}
            </span>
          </div>
        </div>
      </div>
      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__meta">
          <span className="movie-card__year">{movie.year}</span>
          <span className="movie-card__runtime">{movie.runtime} min</span>
        </div>
        <div className="movie-card__genres">
          {movie.genres.slice(0, 3).map((genre, index) => (
            <span key={index} className="movie-card__genre">
              {genre}
            </span>
          ))}
        </div>
        <p className="movie-card__votes">{movie.votes.toLocaleString()} voturi</p>
      </div>
    </Link>
  );
};

export default MovieCard;


import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import TrailerPlayer from './TrailerPlayer';
import { getFallbackImage, getFallbackBackdrop } from '../utils/tmdbImages';

const MovieDetail = ({ movies, userReviews, onAddReview }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === id);
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
      <div className="movie-detail-error">
        <h2>Filmul nu a fost găsit</h2>
        <Link to="/" className="btn-primary">
          Înapoi la listă
        </Link>
      </div>
    );
  }

  // Combine original reviews (if exist) with user-added reviews
  const allReviews = [
    ...(movie.reviews || []), // Adaugă verificare pentru movie.reviews
    ...(userReviews[movie.id] || []),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Calculate average rating from all reviews
  const calculateAverageRating = () => {
    if (allReviews.length === 0) return movie.rating;
    const sum = allReviews.reduce((acc, review) => acc + review.score, 0);
    return sum / allReviews.length;
  };

  const averageRating = calculateAverageRating();
  const totalVotes = movie.votes + (userReviews[movie.id]?.length || 0);

  const formatRating = (rating) => rating.toFixed(1);
  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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
    if (rating >= 8.5) return 'rating-excellent';
    if (rating >= 7.5) return 'rating-good';
    if (rating >= 6.0) return 'rating-average';
    return 'rating-poor';
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
    <div className="movie-detail">
      <div
        className="movie-detail__hero"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${backdropUrl})`,
        }}
      >
        <div className="movie-detail__hero-content">
          <button
            onClick={() => navigate(-1)}
            className="movie-detail__back-btn"
            aria-label="Înapoi"
          >
            ← Înapoi
          </button>
          <div className="movie-detail__hero-info">
            <div className="movie-detail__poster-container">
              <img
                src={posterUrl}
                alt={`Poster pentru ${movie.title}`}
                className="movie-detail__poster"
                onError={() => setPosterError(true)}
              />
              {movie.mpaaRating && (
                <div className="movie-detail__mpaa-rating">{movie.mpaaRating}</div>
              )}
            </div>
            <div className="movie-detail__hero-text">
              <h1 className="movie-detail__title">{movie.title}</h1>
              {movie.tagline && <p className="movie-detail__tagline">{movie.tagline}</p>}
              <div className="movie-detail__meta-row">
                <span className="movie-detail__year">{movie.year}</span>
                {movie.runtime && (
                  <span className="movie-detail__runtime">
                    {formatRuntime(movie.runtime)}
                  </span>
                )}
                {movie.releaseDate && (
                  <span className="movie-detail__release-date">
                    {formatDate(movie.releaseDate)}
                  </span>
                )}
                <div className="movie-detail__genres">
                  {movie.genres.map((genre, index) => (
                    <span key={index} className="movie-detail__genre">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              <div className={`movie-detail__rating ${getRatingColor(averageRating)}`}>
                <span className="movie-detail__rating-value">
                  {formatRating(averageRating)}
                </span>
                <span className="movie-detail__rating-label">
                  / 10 ({totalVotes.toLocaleString()} voturi)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-detail__content">
        <div className="movie-detail__main">
          {movie.trailer && (
            <section className="movie-detail__section">
              <h2 className="movie-detail__section-title">Trailer</h2>
              <TrailerPlayer trailerUrl={movie.trailer} title={movie.title} />
            </section>
          )}

          <section className="movie-detail__section">
            <h2 className="movie-detail__section-title">Sinopsis</h2>
            <p className="movie-detail__synopsis">{movie.synopsis || movie.plot || 'Fără descriere disponibilă.'}</p>
            {movie.fullDescription && (
              <div className="movie-detail__full-description">
                <button
                  onClick={() => toggleSection('description')}
                  className="movie-detail__expand-btn"
                >
                  {expandedSections.description ? '▼ Ascunde' : '▶ Afișează'} descriere completă
                </button>
                {expandedSections.description && (
                  <p className="movie-detail__full-text">{movie.fullDescription}</p>
                )}
              </div>
            )}
          </section>

          <section className="movie-detail__section">
            <h2 className="movie-detail__section-title">Informații de Producție</h2>
            <div className="movie-detail__info-grid">
              {movie.country && (
                <div className="movie-detail__info-item">
                  <span className="movie-detail__info-label">Țară:</span>
                  <span className="movie-detail__info-value">{movie.country}</span>
                </div>
              )}
              {movie.language && (
                <div className="movie-detail__info-item">
                  <span className="movie-detail__info-label">Limba:</span>
                  <span className="movie-detail__info-value">{movie.language}</span>
                </div>
              )}
              {movie.budget && (
                <div className="movie-detail__info-item">
                  <span className="movie-detail__info-label">Buget:</span>
                  <span className="movie-detail__info-value">{formatCurrency(movie.budget)}</span>
                </div>
              )}
              {movie.boxOffice && (
                <div className="movie-detail__info-item">
                  <span className="movie-detail__info-label">Box Office:</span>
                  <span className="movie-detail__info-value">{formatCurrency(movie.boxOffice)}</span>
                </div>
              )}
              {movie.productionCompanies && (
                <div className="movie-detail__info-item">
                  <span className="movie-detail__info-label">Companii de Producție:</span>
                  <span className="movie-detail__info-value">{Array.isArray(movie.productionCompanies) ? movie.productionCompanies.join(', ') : movie.productionCompanies}</span>
                </div>
              )}
              {movie.producer && (
                <div className="movie-detail__info-item">
                  <span className="movie-detail__info-label">Producător:</span>
                  <span className="movie-detail__info-value">{movie.producer}</span>
                </div>
              )}
              {movie.music && (
                <div className="movie-detail__info-item">
                  <span className="movie-detail__info-label">Muzică:</span>
                  <span className="movie-detail__info-value">{movie.music}</span>
                </div>
              )}
              {movie.cinematography && movie.cinematography !== 'N/A (Animație)' && (
                <div className="movie-detail__info-item">
                  <span className="movie-detail__info-label">Imagine:</span>
                  <span className="movie-detail__info-value">{movie.cinematography}</span>
                </div>
              )}
              {movie.editing && (
                <div className="movie-detail__info-item">
                  <span className="movie-detail__info-label">Montaj:</span>
                  <span className="movie-detail__info-value">{movie.editing}</span>
                </div>
              )}
              {movie.artDirection && (
                <div className="movie-detail__info-item">
                  <span className="movie-detail__info-label">Direcție artistică:</span>
                  <span className="movie-detail__info-value">{movie.artDirection}</span>
                </div>
              )}
              {movie.costumeDesign && (
                <div className="movie-detail__info-item">
                  <span className="movie-detail__info-label">Costume:</span>
                  <span className="movie-detail__info-value">{movie.costumeDesign}</span>
                </div>
              )}
              {movie.visualEffects && (
                <div className="movie-detail__info-item">
                  <span className="movie-detail__info-label">Efecte vizuale:</span>
                  <span className="movie-detail__info-value">{movie.visualEffects}</span>
                </div>
              )}
              {movie.soundMix && (
                <div className="movie-detail__info-item">
                  <span className="movie-detail__info-label">Sunet:</span>
                  <span className="movie-detail__info-value">{movie.soundMix}</span>
                </div>
              )}
              {movie.aspectRatio && (
                <div className="movie-detail__info-item">
                  <span className="movie-detail__info-label">Aspect Ratio:</span>
                  <span className="movie-detail__info-value">{movie.aspectRatio}</span>
                </div>
              )}
              {movie.color && (
                <div className="movie-detail__info-item">
                  <span className="movie-detail__info-label">Culoare:</span>
                  <span className="movie-detail__info-value">{movie.color}</span>
                </div>
              )}
              {movie.filmingLocations && (
                <div className="movie-detail__info-item movie-detail__info-item--full">
                  <span className="movie-detail__info-label">Locații de filmare:</span>
                  <span className="movie-detail__info-value">{typeof movie.filmingLocations === 'string' ? movie.filmingLocations : movie.filmingLocations.join(', ')}</span>
                </div>
              )}
              {movie.filmingDates && (
                <div className="movie-detail__info-item">
                  <span className="movie-detail__info-label">Perioada filmării:</span>
                  <span className="movie-detail__info-value">{movie.filmingDates}</span>
                </div>
              )}
            </div>
          </section>

          <section className="movie-detail__section">
            <h2 className="movie-detail__section-title">Echipa</h2>
            <div className="movie-detail__crew">
              <div className="movie-detail__crew-item">
                <span className="movie-detail__crew-label">Regizor:</span>
                <span className="movie-detail__crew-value">{movie.director}</span>
              </div>
              {movie.writers && movie.writers.length > 0 && (
                <div className="movie-detail__crew-item">
                  <span className="movie-detail__crew-label">Scenariști:</span>
                  <span className="movie-detail__crew-value">
                    {movie.writers.join(', ')}
                  </span>
                </div>
              )}
              <div className="movie-detail__crew-item">
                <span className="movie-detail__crew-label">Distribuție:</span>
                <span className="movie-detail__crew-value">
                  {Array.isArray(movie.cast) && movie.cast[0]?.name
                    ? movie.cast.map((actor) => `${actor.name} (${actor.character})`).join(', ')
                    : Array.isArray(movie.cast)
                    ? movie.cast.join(', ')
                    : movie.cast}
                </span>
              </div>
            </div>
          </section>

          {movie.cast && Array.isArray(movie.cast) && movie.cast[0]?.name && (
            <section className="movie-detail__section">
              <h2 className="movie-detail__section-title">
                Distribuție Detaliată
                <button
                  onClick={() => toggleSection('cast')}
                  className="movie-detail__expand-btn"
                >
                  {expandedSections.cast ? '▼' : '▶'}
                </button>
              </h2>
              {expandedSections.cast && (
                <div className="movie-detail__cast-grid">
                  {movie.cast.map((actor, index) => (
                    <div key={index} className="movie-detail__cast-member">
                      {actor.profile && (
                        <img
                          src={actor.profile}
                          alt={actor.name}
                          className="movie-detail__cast-photo"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      <div className="movie-detail__cast-info">
                        <div className="movie-detail__cast-name">{actor.name}</div>
                        <div className="movie-detail__cast-character">{actor.character}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {movie.awards && movie.awards.length > 0 && (
            <section className="movie-detail__section">
              <h2 className="movie-detail__section-title">Premii și Nominalizări</h2>
              <ul className="movie-detail__awards">
                {movie.awards.map((award, index) => (
                  <li key={index} className="movie-detail__award">
                    {award}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {movie.trivia && movie.trivia.length > 0 && (
            <section className="movie-detail__section">
              <h2 className="movie-detail__section-title">
                Curiosități
                <button
                  onClick={() => toggleSection('trivia')}
                  className="movie-detail__expand-btn"
                >
                  {expandedSections.trivia ? '▼' : '▶'}
                </button>
              </h2>
              {expandedSections.trivia && (
                <ul className="movie-detail__trivia">
                  {movie.trivia.map((item, index) => (
                    <li key={index} className="movie-detail__trivia-item">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {movie.quotes && movie.quotes.length > 0 && (
            <section className="movie-detail__section">
              <h2 className="movie-detail__section-title">
                Citate Memorabile
                <button
                  onClick={() => toggleSection('quotes')}
                  className="movie-detail__expand-btn"
                >
                  {expandedSections.quotes ? '▼' : '▶'}
                </button>
              </h2>
              {expandedSections.quotes && (
                <div className="movie-detail__quotes">
                  {movie.quotes.map((quote, index) => (
                    <div key={index} className="movie-detail__quote">
                      "{quote}"
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {movie.contentRating && (
            <section className="movie-detail__section">
              <h2 className="movie-detail__section-title">Rating de Conținut</h2>
              <p className="movie-detail__content-rating">{movie.contentRating}</p>
            </section>
          )}

          <section className="movie-detail__section">
            <h2 className="movie-detail__section-title">
              Recenzii ({allReviews.length})
            </h2>
            <ReviewForm movieId={movie.id} onAddReview={onAddReview} />
            <div className="movie-detail__reviews">
              {displayedReviews.length === 0 ? (
                <p className="movie-detail__no-reviews">
                  Nu există recenzii încă. Fii primul care adaugă o recenzie!
                </p>
              ) : (
                displayedReviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-card__header">
                      <div className="review-card__author">{review.author}</div>
                      <div className="review-card__date">{formatDate(review.date)}</div>
                      <div
                        className={`review-card__score ${getRatingColor(review.score)}`}
                      >
                        {formatRating(review.score)}
                      </div>
                    </div>
                    <p className="review-card__content">{review.content}</p>
                  </div>
                ))
              )}
              {allReviews.length > 3 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="btn-secondary"
                >
                  {showAllReviews
                    ? 'Afișează mai puține recenzii'
                    : `Afișează toate cele ${allReviews.length} recenzii`}
                  </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
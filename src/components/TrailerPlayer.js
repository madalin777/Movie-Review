import React, { useState } from 'react';

/**
 * Component for displaying movie trailers
 * Supports YouTube, Vimeo, and direct video URLs
 */
const TrailerPlayer = ({ trailerUrl, title }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  if (!trailerUrl) {
    return null;
  }

  // Extract YouTube video ID from various URL formats
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
  };

  // Extract Vimeo video ID
  const getVimeoVideoId = (url) => {
    if (!url) return null;
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  const youtubeId = getYouTubeVideoId(trailerUrl);
  const vimeoId = getVimeoVideoId(trailerUrl);

  const renderTrailer = () => {
    if (youtubeId) {
      return (
        <div className="trailer-player__container">
          <iframe
            className="trailer-player__iframe"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={`Trailer pentru ${title}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    if (vimeoId) {
      return (
        <div className="trailer-player__container">
          <iframe
            className="trailer-player__iframe"
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
            title={`Trailer pentru ${title}`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    // Fallback for direct video URLs
    return (
      <div className="trailer-player__container">
        <video
          className="trailer-player__video"
          controls
          autoPlay
          src={trailerUrl}
        >
          Browserul tău nu suportă tag-ul video.
        </video>
      </div>
    );
  };

  return (
    <div className="trailer-player">
      {!showTrailer ? (
        <button
          className="trailer-player__toggle-btn"
          onClick={() => setShowTrailer(true)}
          aria-label="Afișează trailer"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 5v14l11-7z"
              fill="currentColor"
            />
          </svg>
          Vezi Trailer
        </button>
      ) : (
        <div className="trailer-player__wrapper">
          <button
            className="trailer-player__close-btn"
            onClick={() => setShowTrailer(false)}
            aria-label="Închide trailer"
          >
            ×
          </button>
          {renderTrailer()}
        </div>
      )}
    </div>
  );
};

export default TrailerPlayer;


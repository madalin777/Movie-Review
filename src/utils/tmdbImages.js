/**
 * Helper functions for TMDB (The Movie Database) image URLs
 * TMDB provides free access to movie images without API key for direct URLs
 */

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

/**
 * Get TMDB poster image URL
 * @param {string} posterPath - The poster path from TMDB
 * @param {string} size - Image size (w500, w780, original)
 * @returns {string} Full URL to the poster image
 */
export const getPosterUrl = (posterPath, size = 'w500') => {
  if (!posterPath) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`;
};

/**
 * Get TMDB backdrop image URL
 * @param {string} backdropPath - The backdrop path from TMDB
 * @param {string} size - Image size (w1280, w1920, original)
 * @returns {string} Full URL to the backdrop image
 */
export const getBackdropUrl = (backdropPath, size = 'w1280') => {
  if (!backdropPath) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${backdropPath}`;
};

/**
 * Get fallback image URL with light green background
 * @param {string} title - Movie title (optional)
 * @param {number} width - Image width (default: 500)
 * @param {number} height - Image height (default: 750)
 * @returns {string} Placeholder URL with light green background
 */
export const getFallbackImage = (title = 'Movie', width = 500, height = 750) => {
  // Dark background: #1a1a1a
  // Green text: #22c55e
  const encodedTitle = encodeURIComponent(title.substring(0, 30));
  return `https://via.placeholder.com/${width}x${height}/1a1a1a/22c55e?text=${encodedTitle}`;
};

/**
 * Get fallback backdrop image URL
 * @param {string} title - Movie title (optional)
 * @param {number} width - Image width (default: 1280)
 * @param {number} height - Image height (default: 720)
 * @returns {string} Placeholder URL
 */
export const getFallbackBackdrop = (title = 'Movie', width = 1280, height = 720) => {
  const encodedTitle = encodeURIComponent(title.substring(0, 30));
  return `https://via.placeholder.com/${width}x${height}/1a1a1a/22c55e?text=${encodedTitle}`;
};


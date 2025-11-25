import React from 'react';

const Header = ({ query, onQueryChange, featuredMovie }) => {
  return (
    <header className="app-header">
      <div className="app-header__branding">
        <div className="app-header__logo">MovieReview</div>
        <div className="app-header__tagline">
          O experiență de recenzii cinematografice inspirată de IMDb, cu accent
          pe comunitatea cinefililor.
        </div>
      </div>

      <div className="app-header__actions">
        <label className="sr-only" htmlFor="search">
          Caută un film
        </label>
        <input
          id="search"
          type="search"
          placeholder="Caută titlu, actor sau gen..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className="search-input"
        />
        {featuredMovie ? (
          <div className="featured-pill" aria-label="Film recomandat">
            <span className="featured-pill__label">Trending acum</span>
            <span className="featured-pill__title">{featuredMovie.title}</span>
            <span className="featured-pill__meta">
              {featuredMovie.year} • {featuredMovie.genres.join(', ')}
            </span>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;


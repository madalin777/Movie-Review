import React, { useState } from 'react';

const ReviewForm = ({ onAddReview, movieId }) => {
  const [author, setAuthor] = useState('');
  const [score, setScore] = useState(5);
  const [content, setContent] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!author.trim()) {
      newErrors.author = 'Numele este obligatoriu';
    } else if (author.trim().length < 2) {
      newErrors.author = 'Numele trebuie să aibă minim 2 caractere';
    }
    
    if (score < 1 || score > 10) {
      newErrors.score = 'Rating-ul trebuie să fie între 1 și 10';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Recenzia este obligatorie';
    } else if (content.trim().length < 10) {
      newErrors.content = 'Recenzia trebuie să aibă minim 10 caractere';
    } else if (content.trim().length > 1000) {
      newErrors.content = 'Recenzia nu poate depăși 1000 de caractere';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newReview = {
      id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      author: author.trim(),
      score: parseFloat(score),
      date: new Date().toISOString().split('T')[0],
      content: content.trim(),
    };

    onAddReview(movieId, newReview);
    
    // Reset form
    setAuthor('');
    setScore(5);
    setContent('');
    setShowForm(false);
    setErrors({});
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="btn-primary review-form__toggle"
      >
        + Adaugă o recenzie
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h3 className="review-form__title">Adaugă o recenzie</h3>
      
      <div className="review-form__field">
        <label htmlFor="review-author" className="review-form__label">
          Numele tău <span className="review-form__required">*</span>
        </label>
        <input
          id="review-author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={`review-form__input ${errors.author ? 'review-form__input--error' : ''}`}
          placeholder="Introdu numele tău"
          maxLength={50}
        />
        {errors.author && (
          <span className="review-form__error">{errors.author}</span>
        )}
      </div>

      <div className="review-form__field">
        <label htmlFor="review-score" className="review-form__label">
          Rating (1-10) <span className="review-form__required">*</span>
        </label>
        <div className="review-form__score-container">
          <input
            id="review-score"
            type="range"
            min="1"
            max="10"
            step="0.1"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="review-form__slider"
          />
          <span className="review-form__score-value">{score}</span>
        </div>
        {errors.score && (
          <span className="review-form__error">{errors.score}</span>
        )}
      </div>

      <div className="review-form__field">
        <label htmlFor="review-content" className="review-form__label">
          Recenzia ta <span className="review-form__required">*</span>
        </label>
        <textarea
          id="review-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`review-form__textarea ${errors.content ? 'review-form__input--error' : ''}`}
          placeholder="Spune-ne ce crezi despre acest film..."
          rows="5"
          maxLength={1000}
        />
        <div className="review-form__char-count">
          {content.length} / 1000 caractere
        </div>
        {errors.content && (
          <span className="review-form__error">{errors.content}</span>
        )}
      </div>

      <div className="review-form__actions">
        <button type="submit" className="btn-primary">
          Trimite recenzia
        </button>
        <button
          type="button"
          onClick={() => {
            setShowForm(false);
            setErrors({});
            setAuthor('');
            setScore(5);
            setContent('');
          }}
          className="btn-secondary"
        >
          Anulează
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

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

  const handleSubmit = () => {
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
      <TouchableOpacity
        onPress={() => setShowForm(true)}
        style={styles.toggleButton}
      >
        <Text style={styles.toggleButtonText}>+ Adaugă o recenzie</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Adaugă o recenzie</Text>
      
      <View style={styles.field}>
        <Text style={styles.label}>
          Numele tău <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.author && styles.inputError]}
          value={author}
          onChangeText={setAuthor}
          placeholder="Introdu numele tău"
          placeholderTextColor="#64748b"
          maxLength={50}
        />
        {errors.author && (
          <Text style={styles.error}>{errors.author}</Text>
        )}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>
          Rating (1-10) <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.scoreContainer}>
          <View style={styles.scoreButtons}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.scoreButton,
                  score === value && styles.scoreButtonActive,
                ]}
                onPress={() => setScore(value)}
              >
                <Text
                  style={[
                    styles.scoreButtonText,
                    score === value && styles.scoreButtonTextActive,
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>
        {errors.score && (
          <Text style={styles.error}>{errors.score}</Text>
        )}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>
          Recenzia ta <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.textarea, errors.content && styles.inputError]}
          value={content}
          onChangeText={setContent}
          placeholder="Spune-ne ce crezi despre acest film..."
          placeholderTextColor="#64748b"
          multiline
          numberOfLines={5}
          maxLength={1000}
        />
        <Text style={styles.charCount}>
          {content.length} / 1000 caractere
        </Text>
        {errors.content && (
          <Text style={styles.error}>{errors.content}</Text>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Trimite recenzia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowForm(false);
            setErrors({});
            setAuthor('');
            setScore(5);
            setContent('');
          }}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Anulează</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    padding: 15,
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#2d2d2d',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: '#f59e0b',
    marginBottom: 20,
    fontWeight: '800',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    paddingLeft: 10,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 14,
  },
  required: {
    color: '#ef4444',
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderColor: '#2d2d2d',
    borderRadius: 12,
    color: '#f8fafc',
    fontSize: 14,
  },
  textarea: {
    width: '100%',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderColor: '#2d2d2d',
    borderRadius: 12,
    color: '#f8fafc',
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  error: {
    marginTop: 8,
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '600',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  scoreButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    flex: 1,
  },
  scoreButton: {
    padding: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderColor: '#2d2d2d',
    borderRadius: 8,
  },
  scoreButtonActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  scoreButtonText: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '600',
  },
  scoreButtonTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#f59e0b',
    minWidth: 50,
    textAlign: 'center',
  },
  charCount: {
    marginTop: 8,
    textAlign: 'right',
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
    flexWrap: 'wrap',
  },
  submitButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 150,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderColor: '#2d2d2d',
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 150,
  },
  cancelButtonText: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReviewForm;

import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Header = ({ query, onQueryChange, featuredMovie }) => {
  return (
    <View style={styles.header}>
      <View style={styles.branding}>
        <Text style={styles.logo}>MovieReview</Text>
        <Text style={styles.tagline}>
          O experiență de recenzii cinematografice inspirată de IMDb, cu accent
          pe comunitatea cinefililor.
        </Text>
      </View>

      <View style={styles.actions}>
        <TextInput
          style={styles.searchInput}
          placeholder="Caută titlu, actor sau gen..."
          placeholderTextColor="#64748b"
          value={query}
          onChangeText={onQueryChange}
        />
        {featuredMovie ? (
          <View style={styles.featuredPill}>
            <Text style={styles.featuredPillLabel}>Trending acum</Text>
            <Text style={styles.featuredPillTitle}>{featuredMovie.title}</Text>
            <Text style={styles.featuredPillMeta}>
              {featuredMovie.year} • {featuredMovie.genres.join(', ')}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 2,
    borderBottomColor: '#f59e0b',
    padding: 20,
    paddingTop: 40,
  },
  branding: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: '900',
    color: '#f59e0b',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    fontWeight: '300',
  },
  actions: {
    gap: 15,
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    maxWidth: 700,
    padding: 15,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderColor: '#2d2d2d',
    borderRadius: 50,
    color: '#f8fafc',
  },
  featuredPill: {
    backgroundColor: '#f59e0b',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  featuredPillLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#fff',
    opacity: 0.9,
  },
  featuredPillTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
    marginTop: 4,
  },
  featuredPillMeta: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.85,
    marginTop: 4,
  },
});

export default Header;

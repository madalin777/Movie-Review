import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const TrailerPlayer = ({ trailerUrl, title }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  if (!trailerUrl) {
    return null;
  }

  // Extract YouTube video ID from various URL formats
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
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

  const getEmbedUrl = () => {
    if (youtubeId) {
      return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
    }
    if (vimeoId) {
      return `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl();

  return (
    <View style={styles.container}>
      {!showTrailer ? (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowTrailer(true)}
        >
          <Text style={styles.toggleButtonText}>▶ Vezi Trailer</Text>
        </TouchableOpacity>
      ) : (
        <Modal
          visible={showTrailer}
          animationType="slide"
          onRequestClose={() => setShowTrailer(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowTrailer(false)}
            >
              <Text style={styles.closeButtonText}>× Închide</Text>
            </TouchableOpacity>
            {embedUrl ? (
              <WebView
                source={{ uri: embedUrl }}
                style={styles.webview}
                allowsFullscreenVideo
                mediaPlaybackRequiresUserAction={false}
              />
            ) : (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  Format video neacceptat. Te rugăm să deschizi link-ul în browser.
                </Text>
                <TouchableOpacity
                  style={styles.openBrowserButton}
                  onPress={async () => {
                    const supported = await Linking.canOpenURL(trailerUrl);
                    if (supported) {
                      await Linking.openURL(trailerUrl);
                    }
                    setShowTrailer(false);
                  }}
                >
                  <Text style={styles.openBrowserButtonText}>Deschide în browser</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 15,
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#f59e0b',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  webview: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  openBrowserButton: {
    padding: 15,
    backgroundColor: '#f59e0b',
    borderRadius: 12,
  },
  openBrowserButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default TrailerPlayer;

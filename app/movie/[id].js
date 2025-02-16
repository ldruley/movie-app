import { View, Image, Text, StyleSheet, ScrollView, SafeAreaView, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

export default function MovieDetails() {
  const { id, title, poster, overview, releaseDate, voteAverage, backdrop } = useLocalSearchParams();
  const TMDB_API_KEY = '44ec8af5d85873cf6fb611abda4911da';
  const ACCOUNT_ID = '21771161';
  const SESSION_ID = '7ab47c74efc5f1efef6cbbddb5f155f8095f1796'
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const addToFavorites = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/favorite?api_key=${TMDB_API_KEY}&session_id=${SESSION_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            media_type: 'movie',
            media_id: id,
            favorite: true,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', `${title} added to favorites!`);
      } else {
        console.log(data)
        Alert.alert('Error', data.status_message || 'Failed to add movie to favorites.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: title || 'Movie Details'
        }} 
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={{ uri: backdrop }}
          style={styles.detailsPoster}
        />
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{voteAverage}</Text>
              <Text style={styles.ratingLabel}>Rating</Text>
            </View>
          </View>
          
          <Text style={styles.releaseDate}>Released {formatDate(releaseDate)}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.overviewContainer}>
            <Text style={styles.overviewTitle}>Overview</Text>
            <Text style={styles.overview}>{overview}</Text>
          </View>
          <Pressable style={styles.favoriteButton} onPress={addToFavorites}>
            <Text style={styles.favoriteButtonText}>Add to Favorites</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', 
  },
  scrollContent: {
    flexGrow: 1,
  },
  detailsPoster: {
    width: '100%',
    height: 300, 
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#1a1a1a',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 10,
  },
  ratingContainer: {
    alignItems: 'center',
    backgroundColor: '#34a1eb',
    borderRadius: 12,
    padding: 8,
    minWidth: 60,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  ratingLabel: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
  },
  releaseDate: {
    fontSize: 16,
    color: '#9e9e9e',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 15,
  },
  overviewContainer: {
    marginTop: 10,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    color: '#e0e0e0',
  },
  favoriteButton: {
    marginTop: 20,
    backgroundColor: '#e50914',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  favoriteButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
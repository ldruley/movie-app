import { View, Image, Text, StyleSheet, ScrollView, SafeAreaView, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function MovieDetails() {
  const { id, title, poster, overview, releaseDate, voteAverage, backdrop } = useLocalSearchParams();
  const TMDB_API_KEY = '44ec8af5d85873cf6fb611abda4911da';
  const SESSION_ID = '7ab47c74efc5f1efef6cbbddb5f155f8095f1796'

  //format our date string
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
  const [isFav, setIsFavorite] = useState(false);
  
  //Check if this movie is favorited already when the screen is focused
  useFocusEffect(
    useCallback(() => {
      checkFavorites();
    }, [])
  );

  //Check if this movie is favorited already, and update the state
  const checkFavorites = async () => {
    try {
      const url = `https://api.themoviedb.org/3/list/8512518/item_status?api_key=${TMDB_API_KEY}&session_id=${SESSION_ID}&movie_id=${id}&language=en-US`;
      const response = await fetch(url);
      const data = await response.json();
      if(data.item_present === true) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
      } catch (error) {
        console.log(error);
      }
       
  };

  //Toggle favorite status of the movie to the API and update the button
  const toggleFavorite = async () => {
    try {
      const url = isFav
      ? `https://api.themoviedb.org/3/list/8512518/remove_item?api_key=${TMDB_API_KEY}&session_id=${SESSION_ID}`
      : `https://api.themoviedb.org/3/list/8512518/add_item?api_key=${TMDB_API_KEY}&session_id=${SESSION_ID}`;
      const response = await fetch(
        url,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ media_id: id }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsFavorite(!isFav);
        Alert.alert('Success', `${title} has been ${isFav ? 'removed from' : 'added to'} favorites!`);
      } else {
        Alert.alert('Error', data.status_message || 'Failed to update favorites.');
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
              <Text style={styles.ratingText}>{parseFloat(voteAverage).toFixed(1)}</Text>
              <Text style={styles.ratingLabel}>Rating</Text>
            </View>
          </View>
          
          <Text style={styles.releaseDate}>Released {formatDate(releaseDate)}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.overviewContainer}>
            <Text style={styles.overviewTitle}>Overview</Text>
            <Text style={styles.overview}>{overview}</Text>
          </View>

          <Pressable style={[styles.favoriteButton, isFav ? styles.favoriteButtonActive : {}]} onPress={toggleFavorite}>
            <Text style={styles.favoriteButtonText}>
              {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
            </Text>
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
  favoriteButtonActive: {
    backgroundColor: '#34a1eb',
  },
  favoriteButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
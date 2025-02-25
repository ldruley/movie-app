import { Image, StyleSheet, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import React, {useState, useEffect} from 'react';
import { Link } from 'expo-router';
//import { Movie } from '../types/movie';
import { initDatabase } from '../../database';  
import { useNavigation } from 'expo-router';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
}

export default function HomeScreen() {
  const API_KEY = '44ec8af5d85873cf6fb611abda4911da';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  //on load, create/get database and fetch trending movies, set navigation header
  useEffect(() => {
    fetchMovies();
    initDatabase();
    navigation.setOptions({ headerShown: true });
  }, [navigation]);

  //Fetch trending movies from api
  const fetchMovies = async () => {
    try {
      let url = `${BASE_URL}/movie/popular?language=en-US&page=1&api_key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setIsLoading(false);
    }
  };

  //Render movie list
  const renderMovie = ({ item }: { item: Movie }) => (
    <View style={styles.movieWrapper}>
      <Link
        href={{
          pathname: "/movie/[id]" as const,
          params: { 
          id: item.id,
          title: item.title,
          poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          overview: item.overview,
          releaseDate: item.release_date,
          voteAverage: item.vote_average,
          backdrop: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
          }
        }}
        asChild
      > 
        <TouchableOpacity style={styles.movieItem}>
          <Image
            source={{ 
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`
            }}
            style={styles.poster}
          />
        </TouchableOpacity>
      </Link>
    </View>
  );

  //Display loading indicator while fetching movies
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 15 }}>
        <ThemedText style={styles.headerTitle}>Trending Movies</ThemedText>
      </View>
        
      <FlatList<Movie>
        data={movies}
        renderItem={renderMovie}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.movieGrid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    paddingTop: 15,
    backgroundColor: '#212120',
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieWrapper: {
    flex: 1, 
    maxWidth: '50%',
    padding: 5, 
},
  movieGrid: {
    padding: 10,
  },
  movieItem: {
    flex: 1,
  },
  poster: {
    width: '100%',
    aspectRatio: 2/3,
    borderRadius: 8,
  },
});

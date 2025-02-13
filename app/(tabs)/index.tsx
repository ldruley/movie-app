import { Image, StyleSheet, View, TouchableOpacity, FlatList, Dimensions, ActivityIndicator } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, {useState, useEffect} from 'react';
import { Link } from 'expo-router';
//import { Movie } from '../types/movie';
import { initDatabase } from '../../database';  

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}



export default function HomeScreen() {
  const apiURL = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const key = process.env.TMDB_API_KEY;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + key
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(apiURL, options);
      const data = await response.json();
      console.log(data);
      setMovies(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setIsLoading(false);
    }
  };

  const renderMovie = ({ item }: { item: Movie }) => (
    <Link
      href={{
        pathname: "/movie/[id]" as const,
        params: { 
          id: item.id,
          title: item.title,
          poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          overview: item.overview,
          releaseDate: item.release_date,
          voteAverage: item.vote_average
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
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ParallaxScrollView 
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47'}}
      headerImage={
        <Image
          source={require('@/assets/images/movie-banner.png')}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.container}>
        <FlatList<Movie>
          data={movies}
          renderItem={renderMovie}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.movieGrid}
        />
      </View>
    </ParallaxScrollView>
  );
};


const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieGrid: {
    padding: 10,
  },
  movieItem: {
    flex: 1,
    margin: 5,
  },
  poster: {
    width: '100%',
    aspectRatio: 2/3,
    borderRadius: 8,
  },
  
});

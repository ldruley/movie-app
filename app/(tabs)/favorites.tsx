import { Image, StyleSheet, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import { Link } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
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

const favorites : React.FC = () => {
    const TMDB_API_KEY = '44ec8af5d85873cf6fb611abda4911da';
    const SESSION_ID = '7ab47c74efc5f1efef6cbbddb5f155f8095f1796'

    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    //Set navigation header
    useEffect(() => {
        navigation.setOptions({ headerShown: true });
    }, [navigation]);

    //Fetch movies on focus
    useFocusEffect(
      useCallback(() => {
        fetchMovies();
      }, [])
    );

    //Get favorite movies list from api
    const fetchMovies = async () => {
        try {
          let url = `https://api.themoviedb.org/3/list/8512518?api_key=${TMDB_API_KEY}&session_id=${SESSION_ID}&language=en-US&page=1`;
          const response = await fetch(url);
          const data = await response.json();
          setMovies(data.items);
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
    
    //Check if loading
    if (isLoading) {
        return (
        <View>
            <ActivityIndicator size="large" color="#fff" />
        </View>
        );
    }

    return (
      <View style={styles.container}>       
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
    container: {
      paddingTop: 15,
      flex: 1,
      backgroundColor: '#212120'
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

export default favorites;
  
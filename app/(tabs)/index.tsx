import { Image, StyleSheet, TextInput, View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, {useState, useEffect} from 'react';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};


export default function HomeScreen() {
  const genres: string[] = ['Action','Comedy','Drama', 'Fantasy', 'Horror', 'Romance', 'Sci.-Fi.', 'Thriller'];
  const apiURL = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const key = process.env.REACT_APP_WEATHER_API_KEY;
  const [showGenres, setGenres] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

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
      setMovies(data.results);
      console.log(data.results)
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const filterClick = () => {
    setGenres(!showGenres);
  }
  const selectGenre = (genre: string) => {
    setSelectedGenres((selected) => {
      if (selected.includes(genre)) {
        return selected.filter((item) => item !== genre);
      } else {
        return [...selected, genre];
      }
    });
    
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Search for a movie!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder='Search movie'
          />
          <TouchableOpacity onPress={filterClick} style={styles.filterBox}>
            <Text style={styles.filterText}>Filter movies</Text>
          </TouchableOpacity>
          {showGenres && (
            <View>
              {genres.map(genre => (
                <TouchableOpacity key={genre} onPress={() => selectGenre(genre)} style={styles.genreContainer}>
                  <View style={[styles.checkBox, selectedGenres.includes(genre) && styles.checkedBox,]}/>
                  <Text style={styles.genreText}>{genre}</Text>
                </TouchableOpacity>
              ))}
            </View> 
          )}
      </ThemedView>

      <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}  // Display 2 columns for the grid
      renderItem={({ item }) => (
        <View style={styles.movieContainer}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            style={styles.moviePoster}
          />
          <Text style={styles.movieTitle}>{item.title}</Text>
        </View>
      )}
      contentContainerStyle={styles.movieList}
    />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  searchContainer: {
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  filterBox: {
    alignItems: 'center',
    marginTop: 8,
  },
  filterText: {
    height: 'auto',
    width: 'auto',
    borderColor: '#ccc',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  genreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  genreText: {
    fontSize: 18,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 2
  },
  checkedBox: {
    backgroundColor: '#ccc'
  },
  movieList: {
    padding: 10,
  },
  movieContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  moviePoster: {
    width: Dimensions.get('window').width / 2 - 40, 
    height: 225,
    borderRadius: 10,
  },
  movieTitle: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  
});

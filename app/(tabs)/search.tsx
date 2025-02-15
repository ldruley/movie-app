import { Image, StyleSheet, TextInput, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, {useState} from 'react';
import { ScrollView } from 'react-native-gesture-handler';


const API_KEY = '5382c57e3a10e4ee81ac236e9d652dac';
const BASE_URL = 'https://api.themoviedb.org/3';


export default function HomeScreen() {
  const [showGenres, setGenres] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [searchMovie, setSearch] = useState('');
  const [searchedMovie, setSearched] = useState<any[]>([]);
  const [searchedGenres, setSearchedGenres] = useState<any[]>([]);
  const [searchedMovieDetails, setMovieDetails] = useState<Movie | null>(null);

  const displayGenres = async () => {
    try {
      let url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchedGenres(data.genres);
    } catch (error) {
      console.error(error);
    }
  };
 
  const filterClick = () => {
    if (!showGenres) {
      displayGenres();
    }
    setGenres(!showGenres);
  };

  const selectGenre = (genreId: number) => {
    setSelectedGenres((selected) => {
      if (selected.includes(genreId)) {
        return selected.filter((id) => id !== genreId);
      } else {
        return [...selected, genreId];
      }
    });
  };

  interface Movie {
    id: number;
    title: string;
    release_date: string;
    overview: string;
    genre_ids: number[]
  }

  const search = async () => {
    if (searchMovie.trim()) {
      try {
        let url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchMovie}`;
        if (selectedGenres.length > 0) {
          url += `&with_genres=${selectedGenres.join(',')}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        const filteredMovies = data.results.filter((movie: Movie) => {
          const movieGenres = movie.genre_ids;
          const matchingGenres = selectedGenres.length === 0 || movieGenres.some((id) => selectedGenres.includes(id));
          return matchingGenres;
        });
        setSearched(filteredMovies);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const clickMovie = (movie: Movie) => {
    if (searchedMovieDetails?.id === movie.id) {
      setMovieDetails(null);
    } else {
    setMovieDetails(movie);
    }
  };


  return (
    <ParallaxScrollView 
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47'}}
      headerImage={
        <Image
        source={require('@/assets/images/partial-react-logo.png')}
        style={styles.reactLogo}
       />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Search for a movie!</ThemedText>
      </ThemedView>


      <ThemedView style={styles.searchContainer}>
        <TextInput
        // Text input for search
          style={styles.searchInput}
          placeholder='Search movie'
          value={searchMovie}
          onChangeText={setSearch}
          />
          <TouchableOpacity onPress={search} style={styles.searchBox}>
            // Search button for movies types into text input
            <Text style={styles.filterText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={filterClick} style={styles.filterBox}>
            <Text style={styles.filterText}>Filter Movies</Text>
          </TouchableOpacity>
          {showGenres && (
            <View>
              {searchedGenres.map(genre => (
                // Selecting/deselecting genres
                <TouchableOpacity key={genre.id} onPress={() => selectGenre(genre.id)} style={styles.genreContainer}>
                  <View style={[styles.checkBox, selectedGenres.includes(genre.id) && styles.checkedBox,]}/>
                  <Text style={styles.genreText}>{genre.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
      </ThemedView>
      <FlatList
        data={searchedMovie}
        renderItem={({item}) => {
          const moviePoster = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
          return(
            <View style={styles.movieContainer}>
              <TouchableOpacity onPress={() => clickMovie(item)} style={styles.movieContainer}>
                <Image
                  source={{uri: moviePoster}}
                  style={styles.poster}
                  />
                  <Text style={styles.movieTitle}>{item.title} ({item.release_date})</Text>
              </TouchableOpacity>
              {searchedMovieDetails?.id === item.id && searchedMovieDetails?.overview && (
                <View style={styles.searchedMovieDetailsContainer}>
                  <Text style={styles.movieDetails}>{searchedMovieDetails.overview}</Text>
                </View>
              )}
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
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
  searchBox: {
    backgroundColor: "#007bff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  filterBox: {
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  filterText: {
    height: 'auto',
    width: 'auto',
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
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
    borderWidth: 2,
    marginRight: 5,
  },
  checkedBox: {
    backgroundColor: '#ccc'
  },
  movieContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
  },
  poster: {
    width: '100%',
    height: 300,
  },
  movieTitle: {
    fontSize: 20,
  },
  searchedMovieDetailsContainer: {
    padding: 10,
  },
  movieDetails: {
    fontSize: 16,
  },
 
});






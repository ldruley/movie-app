import { Image, StyleSheet, TextInput, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link, useNavigation } from 'expo-router';
const API_KEY = '5382c57e3a10e4ee81ac236e9d652dac';
const BASE_URL = 'https://api.themoviedb.org/3';

export default function HomeScreen() {
  const [showGenres, setGenres] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [searchMovie, setSearch] = useState('');
  const [searchedMovie, setSearched] = useState<any[]>([]);
  const [searchedGenres, setSearchedGenres] = useState<any[]>([]);
  const [searchedMovieDetails, setMovieDetails] = useState<Movie | null>(null);
  const navigation = useNavigation();

  interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
    backdrop_path: string;
    genre_ids: number[];
  }

  useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);


  // Displays genres from API
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

  // Show genres for movies
  const filterClick = () => {
    if (!showGenres) {
      displayGenres();
    }
    setGenres(!showGenres);
  };

  // Selecting/deselecting genres
  const selectGenre = (genreId: number) => {
    setSelectedGenres((selected) => {
      if (selected.includes(genreId)) {
        return selected.filter((id) => id !== genreId);
      } else {
        return [...selected, genreId];
      }
    });
  };

  // Searches for movies based on text input
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
        setGenres(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Select searched movies to show details
  const clickMovie = (movie: Movie) => {
    if (searchedMovieDetails?.id === movie.id) {
      setMovieDetails(null);
    } else {
      setMovieDetails(movie);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}></View>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder='Search movie'
          placeholderTextColor="#666"
          value={searchMovie}
          onChangeText={setSearch}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={search} style={styles.searchBox}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={filterClick} style={styles.filterBox}>
            <Text style={styles.buttonText}>Filter Movies</Text>
          </TouchableOpacity>
        </View>

        {showGenres && (
          <ScrollView style={styles.genreList}>
            {searchedGenres.map(genre => (
              <TouchableOpacity
                key={genre.id}
                onPress={() => selectGenre(genre.id)}
                style={styles.genreContainer}
              >
                <View style={[styles.checkBox, selectedGenres.includes(genre.id) && styles.checkedBox]} />
                <Text style={styles.genreText}>{genre.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <FlatList
        data={searchedMovie}
        renderItem={({ item }) => {
          const moviePoster = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
          return (
            <View style={styles.movieContainer}>
              <TouchableOpacity onPress={() => clickMovie(item)}>
                <Image
                  source={{ uri: moviePoster }}
                  style={styles.poster}
                />
                <Text style={styles.movieTitle}>{item.title} ({item.release_date})</Text>
              </TouchableOpacity>
              {searchedMovieDetails?.id === item.id && searchedMovieDetails?.overview && (
                <View style={styles.searchedMovieDetailsContainer}>
                  <Text style={styles.movieDetails}>{searchedMovieDetails.overview}</Text>
                  <View style={styles.movieWrapper}>
                    <Link
                      href={{
                        pathname: "/movie/[id]",
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
                      style={styles.button}
                    >
                      <Text style={styles.viewMovieText}>View Movie</Text>
                    </Link>
                  </View>
                </View>
              )}
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.movieList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    padding: 5,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchSection: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    height: 45,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  searchBox: {
    flex: 1,
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterBox: {
    flex: 1,
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  genreList: {
    marginTop: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  genreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  genreText: {
    fontSize: 16,
    color: '#333',
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#007bff',
    marginRight: 10,
    borderRadius: 4,
  },
  checkedBox: {
    backgroundColor: '#007bff'
  },
  movieList: {
    padding: 15,
  },
  movieContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  poster: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    padding: 15,
  },
  searchedMovieDetailsContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  movieDetails: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  movieWrapper: {
    marginBottom: 10,  
    width: '100%',
  },
  button: {
    backgroundColor: '#34a1eb',
    padding: 10,
    borderRadius: 8,
    width: 105,
    alignContent: 'center',
    marginTop: 10,
  },
  viewMovieText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

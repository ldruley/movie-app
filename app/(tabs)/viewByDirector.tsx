import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, 
  FlatList, Image, StyleSheet 
} from "react-native";

const API_KEY = "96f3348c905dce82f4e2e2f636f6b8cc";
const BASE_URL = "https://api.themoviedb.org/3";

interface Movie {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string;
}

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchPerson = async () => {
    if (!query.trim()) {
      setError("Please enter a valid actor or director name.");
      return;
    }

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      
      const response = await fetch(`${BASE_URL}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Failed to fetch person data");

      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        setError("No results found.");
        return;
      }

      const personId = data.results[0].id;

      // Fetch movie credits
      const creditsResponse = await fetch(`${BASE_URL}/person/${personId}/movie_credits?api_key=${API_KEY}`);
      if (!creditsResponse.ok) throw new Error("Failed to fetch movie credits");

      const creditsData = await creditsResponse.json();
      if (!creditsData.cast || creditsData.cast.length === 0) {
        setError("No movies found for this person.");
        return;
      }

      // Sort from newest to oldest
      const sortedMovies = creditsData.cast
        .filter((movie: Movie) => movie.release_date) 
        .sort((a: Movie, b: Movie) => (b.release_date! > a.release_date! ? 1 : -1));

      setMovies(sortedMovies);
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
        
      <Text style={styles.title}>{"\n"}{"\n"}Search Movies by Director/Actor</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter an actor or director name"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity onPress={searchPerson} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      
      {loading && <ActivityIndicator size="large" color="#007bff" />}

      
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Movies List */}
      <FlatList
        data={movies}
        keyExtractor={(movie) => movie.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieCard}>
            {item.poster_path ? (
              <Image source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }} style={styles.image} />
            ) : (
              <View style={styles.noImage}>
                <Text style={styles.noImageText}>No Image</Text>
              </View>
            )}
            <Text style={styles.movieTitle}>{item.title}</Text>
            {item.release_date && <Text style={styles.releaseDate}>{item.release_date}</Text>}
          </View>
        )}
      />
    </View>
  );
};

// style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  movieCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  noImage: {
    width: 100,
    height: 150,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#666",
  },
  movieTitle: {
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  releaseDate: {
    color: "#666",
    marginTop: 2,
    textAlign: "center",
  },
});

export default MovieSearch;

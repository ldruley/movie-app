import { Image, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, {useState} from 'react';

export default function HomeScreen() {
  const genres: string[] = ['Action','Comedy','Drama', 'Fantasy', 'Horror', 'Romance', 'Sci.-Fi.', 'Thriller'];
  const [showGenres, setGenres] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
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
  }
  
});

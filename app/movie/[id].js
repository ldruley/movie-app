import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function MovieDetails() {
  const { id, title, poster } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: poster }}
        style={styles.detailsPoster}
      />
      <View style={styles.detailsContent}>
        <Text style={styles.title}>{title}</Text>
        {/* Rest of movie details here */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    detailsPoster: {
      width: '100%',
      height: 300,
    },
    detailsContent: {
      padding: 20,
    },
    title: {
      fontSize: 24,
      color: '#fff',
      fontWeight: 'bold',
    },
  });
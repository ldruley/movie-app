import { View, Image, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

export default function MovieDetails() {
  const { id, title, poster, overview, releaseDate, voteAverage, backdrop } = useLocalSearchParams();
  
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
              <Text style={styles.ratingText}>{voteAverage}</Text>
              <Text style={styles.ratingLabel}>Rating</Text>
            </View>
          </View>
          
          <Text style={styles.releaseDate}>Released {formatDate(releaseDate)}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.overviewContainer}>
            <Text style={styles.overviewTitle}>Overview</Text>
            <Text style={styles.overview}>{overview}</Text>
          </View>
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
  }
});
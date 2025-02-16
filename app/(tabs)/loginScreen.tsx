import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';  // Import useRouter

import { getUserByIdentifier } from '../../database';  

const LoginScreen: React.FC = () => {
  const [identifier, setIdentifier] = useState<string>(''); // Accept username or email
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Error', 'Both fields are required');
      return;
    }

    try {
      console.log('Attempting to log in with:', identifier);
      const user = await getUserByIdentifier(identifier.trim(), password.trim());

      if (user) {
        Alert.alert('Success', 'Login successful!');
        router.push('/'); // Navigate to Home
      } else {
        Alert.alert('Error', 'Invalid username/email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'There was an error while logging in');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={identifier}
        onChangeText={setIdentifier}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      
      <Text style={styles.link} onPress={() => router.push('/registerAccount')}>
        Don't have an account? Sign up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  link: { textAlign: 'center', marginTop: 10, color: 'blue' },
});

export default LoginScreen;

import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { insertUser } from '../../database';
import { useRouter } from 'expo-router';  // Import useRouter


type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type RegistrationScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface Props {
  navigation: RegistrationScreenNavigationProp;
}

const RegistrationScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');  
  const [email, setEmail] = useState<string>('');        
  const [password, setPassword] = useState<string>('');  
  const router = useRouter();  // Initialize router
  

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
  
    try {
      console.log("Attempting to register user:", username, email);
      const result = await insertUser(username, email, password);
      console.log("User inserted result:", result);
  
      Alert.alert('Success', 'User registered!');
        router.push('/loginScreen')
    } catch (error) {
      console.error("Error during registration:", error);
      Alert.alert('Error', 'Email already exists or invalid data');
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => router.push('/loginScreen')}>
        Already have an account? Log in
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

export default RegistrationScreen;


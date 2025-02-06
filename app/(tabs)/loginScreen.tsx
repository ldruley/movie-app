import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getUsers } from '../../database';  // Import the getUsers function


type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');     
  const [password, setPassword] = useState<string>(''); 

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Both fields are required');
      return;
    }
  
    try {
      const users = await getUsers();
      console.log('Fetched users:', users);
  
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPassword = password.trim();
  
      const user = users.find(
        (user) => user.email.toLowerCase() === normalizedEmail && user.password === normalizedPassword
      );
  
      if (user) {
        Alert.alert('Success', 'Login successful!');
        //navigation.navigate('Home');  // Navigate to Home after successful login
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);  // Log errors
      Alert.alert('Error', 'There was an error while logging in');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
      
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
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

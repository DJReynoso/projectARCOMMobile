import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:5001';

function Register({ onNavigate }: any) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        first_name: firstName,
        last_name: lastName,
        name: username,
        email: email,
        password: password,
      });

      console.log('Registration successful:', response.data);
      Alert.alert('Success', 'Registration successful! Please login.');
      onNavigate('Login');
    } catch (error: any) {
      console.error(
        'Registration failed:',
        error.response?.data || error.message,
      );
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Registration failed',
      );
    }
  };
  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Register</Text>

        <View style={styles.inputContainer}>
          <Icon name="id-card" size={20} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.inputWithIcon}
            placeholder="First Name"
            placeholderTextColor="#6B7280"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="id-card" size={20} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.inputWithIcon}
            placeholder="Last Name"
            placeholderTextColor="#6B7280"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.inputWithIcon}
            placeholder="Email"
            placeholderTextColor="#6B7280"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.inputWithIcon}
            placeholder="Username"
            placeholderTextColor="#6B7280"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.passwordContainer}>
          <Icon name="lock" size={20} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#6B7280"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              name={showPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <Icon name="lock" size={20} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            placeholderTextColor="#6B7280"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Icon
              name={showConfirmPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  loginContainer: {
    width: 360,
    backgroundColor: '#0f1528',
    borderRadius: 8,
    padding: 20,
    flexDirection: 'column',
  },
  input: {
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: 999,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  inputWithIcon: {
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: 999,
    borderColor: '#fff',
    borderWidth: 1,
    paddingLeft: 48,
    paddingRight: 16,
    fontSize: 16,
    color: '#fff',
  },
  icon: {
    position: 'absolute',
    left: 16,
    top: 15,
    zIndex: 1,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  passwordInput: {
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: 999,
    borderColor: '#fff',
    borderWidth: 1,
    paddingLeft: 48,
    paddingRight: 50,
    fontSize: 16,
    color: '#fff',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 15,
    zIndex: 1,
  },
  registerButton: {
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    color: '#0f1528',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Register;

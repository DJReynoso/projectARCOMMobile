import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const BACKEND_URL = 'http://10.0.2.2:5001';

function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        name: username, // Backend expects 'name' field
        password: password,
      });
      // This is where we save ang token
      const token = response.data.token;
      await AsyncStorage.setItem('authtoken', token);
      console.log('Login successful', response.data);
      // Navigate to Admin Dashboard
      navigation.navigate('Admin Dashboard' as never);
    } catch (error: any) {
      console.error('Login failed:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.message || 'Login failed');
    }
  };
  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={require('./assets/ARCOMLogo.png')} style={styles.logo} />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>

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

        <View style={styles.rememberAndForgotContainer}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={rememberMe}
              onValueChange={setRememberMe}
              tintColors={{ true: '#fff', false: '#fff' }}
            />
            <Text style={styles.checkboxLabel}>Remember me</Text>
          </View>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.noAccount}>
          <Text style={styles.noAccountText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register' as never)}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
  },
  loginContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'rgba(15, 21, 40, 0.9)',
    borderRadius: 16,
    padding: 28,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 15,
    color: '#fff',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  inputWithIcon: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    paddingLeft: 44,
    paddingRight: 16,
    fontSize: 15,
    color: '#fff',
  },
  icon: {
    position: 'absolute',
    left: 16,
    top: 15,
    zIndex: 1,
    color: '#7a8db5',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  passwordInput: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    paddingLeft: 44,
    paddingRight: 50,
    fontSize: 15,
    color: '#fff',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 15,
    zIndex: 1,
  },
  rememberAndForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    color: '#7a8db5',
    fontSize: 13,
    marginLeft: 8,
  },
  forgotPassword: {
    color: '#4e9eff',
    fontSize: 13,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#4e9eff',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: 'rgba(78, 158, 255, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  noAccountText: {
    color: '#7a8db5',
    fontSize: 13,
  },
  registerText: {
    color: '#4e9eff',
    fontWeight: '600',
    fontSize: 13,
  },
  exitButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
});

export default Login;

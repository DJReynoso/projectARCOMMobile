import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../store/AuthContext';

const BASE_URL = 'http://10.0.2.2:5001';

function WorkerLogin() {
  const { isWorker, setIsWorker } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter your username and password.');
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      await AsyncStorage.setItem('authtoken', data.token);
      setIsWorker(true);
    } catch (err: any) {
      Alert.alert('Login Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authtoken');
    setIsWorker(false);
  };

  if (isWorker) {
    return (
      <LinearGradient
        colors={['#020E2A', '#0F172A', '#0B2154']}
        style={styles.container}
      >
        <View style={styles.loggedInContainer}>
          <View style={styles.avatarCircle}>
            <Icon name="person" size={48} color="#fff" />
          </View>
          <Text style={styles.loggedInTitle}>Logged in as Worker</Text>
          <Text style={styles.loggedInSub}>
            You have access to Tasks and can manage alert actions.
          </Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="log-out-outline" size={18} color="#fff" />
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Icon
          name="construct-outline"
          size={48}
          color="#60A5FA"
          style={styles.workerIcon}
        />
        <Text style={styles.title}>Worker Login</Text>
        <Text style={styles.subtitle}>
          Sign in to manage alerts and view assigned tasks
        </Text>

        <View style={styles.inputWrapper}>
          <Icon
            name="person-outline"
            size={18}
            color="#6B7280"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#6B7280"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Icon
            name="lock-closed-outline"
            size={18}
            color="#6B7280"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#6B7280"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <Icon
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={18}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login as Worker</Text>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  // Logged-in state
  loggedInContainer: { alignItems: 'center', padding: 32 },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loggedInTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  loggedInSub: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#DC2626',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  // Login form state
  formContainer: {
    width: 340,
    backgroundColor: 'rgba(15,21,40,0.95)',
    borderRadius: 12,
    padding: 24,
  },
  workerIcon: { alignSelf: 'center', marginBottom: 12 },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 14,
    height: 48,
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, color: '#fff', fontSize: 15 },
  eyeButton: { padding: 4 },
  loginButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  loginButtonDisabled: { opacity: 0.6 },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default WorkerLogin;

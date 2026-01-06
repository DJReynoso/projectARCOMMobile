import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log('Login pressed', { username, password, rememberMe });
    // Add your login logic here
  };

  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#6B7280"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#6B7280"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

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
          <Text style={styles.registerText}>Register</Text>
        </View>

        <Text style={styles.orText}>or</Text>

        <TouchableOpacity style={styles.guestButton}>
          <Text style={styles.guestButtonText}>Sign in as Guest</Text>
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
  rememberAndForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    color: '#fff',
  },
  forgotPassword: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#0f1528',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  noAccountText: {
    color: '#fff',
  },
  registerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
  },
  guestButton: {
    backgroundColor: 'transparent',
    height: 50,
    borderRadius: 999,
    borderColor: `#fff`,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  guestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;

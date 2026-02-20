import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

function AdminLogin() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.adminLoginButton}
          onPress={() => navigation.navigate('Login' as never)}
        >
          <Text style={{ color: '#fff', fontSize: 24 }}>Admin Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminLoginButton: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
});

export default AdminLogin;

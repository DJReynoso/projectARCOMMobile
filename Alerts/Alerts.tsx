import { Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NavBar from '../NavBar';

function Alerts() {
  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={{ color: '#fff', fontSize: 24 }}>Alerts</Text>
      </View>
      <NavBar />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Alerts;

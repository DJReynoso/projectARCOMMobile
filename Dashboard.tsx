import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function Dashboard({ onNavigate }: any) {
  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to Dashboard</Text>
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
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Dashboard;

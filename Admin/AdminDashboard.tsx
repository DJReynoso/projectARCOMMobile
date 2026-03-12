import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

function AdminDashboard() {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Unresolved');

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authtoken');
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' as never, params: { screen: 'Admin' } }],
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="sign-out" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Admin Dashboard</Text>
      <View style={styles.content}>
        <View style={styles.alertsContainer}>
          <LinearGradient
            colors={['#121E33', '#0C1F3E', '#13223C']}
            style={styles.alertGradient}
          >
            <View style={styles.navigationBarContent}>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  selectedTab === 'Unresolved' && styles.navButtonSelected,
                ]}
                onPress={() => setSelectedTab('Unresolved')}
              >
                <Text style={styles.navButtonText}>Unresolved</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  selectedTab === 'Ongoing Fix' && styles.navButtonSelected,
                ]}
                onPress={() => setSelectedTab('Ongoing Fix')}
              >
                <Text style={styles.navButtonText}>Ongoing Fix</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  selectedTab === 'Resolved' && styles.navButtonSelected,
                ]}
                onPress={() => setSelectedTab('Resolved')}
              >
                <Text style={styles.navButtonText}>Resolved</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  title: {
    position: 'absolute',
    top: 50,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  alertsContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  alertGradient: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
  },
  navigationBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 999,
    marginHorizontal: 15,
    marginTop: 15,
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  navButtonSelected: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#121E33',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default AdminDashboard;

import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

function Alerts() {
  const [selectedTab, setSelectedTab] = useState('Unresolved');

  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 75,
  },
  alertsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 360,
    height: '100%',
    marginBottom: 15,
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

export default Alerts;

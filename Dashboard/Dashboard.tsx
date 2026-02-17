import { Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

function Dashboard() {
  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      <View style={styles.upperContent}>
        <View style={styles.activeNodesContainer}>
          <View>
            <Icon name="hdd-o" size={40} color="#00FF00" />
          </View>
          <Text style={styles.containerTitle}>Active Nodes</Text>
          <Text style={styles.containerValue}>4</Text>
          <Text style={styles.containerSubtext}>/ 4</Text>
          <Text style={styles.containerStatus}>Online</Text>
        </View>
        <View style={styles.lastClogAlertContainer}>
          <View>
            <Icon name="clock-o" size={40} color="#FF0000" />
          </View>
          <Text style={styles.containerTitle}>Last Clog Alert</Text>
          <Text style={styles.containerValue}>12:42</Text>
          <Text style={styles.containerSubtext}>PM</Text>
          <Text style={styles.containerStatus}>Node A: B Segment</Text>
        </View>
      </View>
      <View style={styles.liveAlertsFeedContainer}>
        <LinearGradient
          colors={[
            'rgba(18, 30, 51, 0.75)',
            'rgba(12, 31, 62, 0.75)',
            'rgba(19, 34, 60, 0.75)',
          ]}
          style={styles.liveAlertsFeedGradient}
        >
          <View style={styles.statusContainer}>
            <View style={styles.greenCircle} />
            <Text style={styles.statusText}>Live Alerts Feed</Text>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 75,
    gap: 10,
  },
  activeNodesContainer: {
    backgroundColor: 'rgba(12, 70, 51, 0.20)',
    width: 170,
    height: 170,
    marginRight: 20,
    borderRadius: 10,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  lastClogAlertContainer: {
    backgroundColor: 'rgba(70, 8, 9, 0.20)',
    width: 170,
    height: 170,
    borderRadius: 10,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  containerTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  containerValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },
  containerSubtext: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.7,
  },
  containerStatus: {
    color: '#fff',
    fontSize: 10,
    marginTop: 5,
    opacity: 0.8,
  },
  liveAlertsFeedContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  liveAlertsFeedGradient: {
    width: 360,
    height: '100%',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    gap: 8,
  },
  greenCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00FF00',
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Dashboard;

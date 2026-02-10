import { Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function Dashboard() {
  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      <View style={styles.upperContent}>
        <View style={styles.activeNodesContainer}></View>
        <View style={styles.lastClogAlertContainer}></View>
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
  },
  lastClogAlertContainer: {
    backgroundColor: 'rgba(70, 8, 9, 0.20)',
    width: 170,
    height: 170,

    borderRadius: 10,
    marginBottom: 5,
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

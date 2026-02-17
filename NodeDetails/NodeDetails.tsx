import { Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

function NodeDetails() {
  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.shadowWrapper}>
          <View style={styles.nodeContainer}>
            <LinearGradient
              colors={['#121E33', '#0C1F3E', '#13223C']}
              style={styles.gradientFill}
            >
              <View style={styles.nodeHeader}>
                <Text style={styles.nodeTitle}>Node A</Text>
                <Text style={styles.nodeStatus}>Status: Online</Text>
              </View>
              <View style={styles.nodeBody}>
                <View style={styles.iconContainer}>
                  <Icon name="hdd-o" size={50} color="#00FF00" />
                </View>
                <View style={styles.nodeInfo}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoText}>Water level: 10 m</Text>
                    <Text style={styles.infoText}>Water flow rate: 1 m³/s</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoText}>Rainfall amount: 2 mm</Text>
                    <Text style={styles.infoText}>Junk Level: 0.5 m</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoText}>
                      Clog status: No clogging
                    </Text>
                    <Text style={styles.infoText}>Battery: 80%</Text>
                  </View>
                  <Text style={styles.systemInsights}>System Insights:</Text>
                  <Text style={styles.insightsText}>
                    No early signs of water overflow
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.shadowWrapper}>
          <View style={styles.nodeContainer}>
            <LinearGradient
              colors={['#121E33', '#0C1F3E', '#13223C']}
              style={styles.gradientFill}
            >
              <View style={styles.nodeHeader}>
                <Text style={styles.nodeTitle}>Node B</Text>
                <Text style={styles.nodeStatusOffline}>Status: Offline</Text>
              </View>
              <View style={styles.nodeBody}>
                <View style={styles.iconContainer}>
                  <Icon name="hdd-o" size={50} color="#FF0000" />
                </View>
                <View style={styles.nodeInfo}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoText}>Water level: 15 m</Text>
                    <Text style={styles.infoText}>
                      Water flow rate: 0.1 m³/s
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoText}>Rainfall amount: 2 mm</Text>
                    <Text style={styles.infoText}>Junk Level: 4.5 m</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoText}>Clog status: Clogged</Text>
                    <Text style={styles.infoText}>Battery: 80%</Text>
                  </View>
                  <Text style={styles.systemInsights}>System Insights:</Text>
                  <Text style={styles.insightsText}>
                    Water overflow in approximately 15-20 minutes
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.shadowWrapper}>
          <View style={styles.nodeContainer}>
            <LinearGradient
              colors={['#121E33', '#0C1F3E', '#13223C']}
              style={styles.gradientFill}
            >
              <View style={styles.nodeHeader}>
                <Text style={styles.nodeTitle}>Node C</Text>
                <Text style={styles.nodeStatus}>Status: Online</Text>
              </View>
              <View style={styles.nodeBody}>
                <View style={styles.iconContainer}>
                  <Icon name="hdd-o" size={50} color="#00FF00" />
                </View>
                <View style={styles.nodeInfo}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoText}>Water level: 10 m</Text>
                    <Text style={styles.infoText}>Water flow rate: 1 m³/s</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoText}>Rainfall amount: 2 mm</Text>
                    <Text style={styles.infoText}>Junk Level: 0.5 m</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoText}>
                      Clog status: No clogging
                    </Text>
                    <Text style={styles.infoText}>Battery: 80%</Text>
                  </View>
                  <Text style={styles.systemInsights}>System Insights:</Text>
                  <Text style={styles.insightsText}>
                    No early signs of water overflow
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.shadowWrapper}>
          <View style={styles.nodeContainer}>
            <LinearGradient
              colors={['#121E33', '#0C1F3E', '#13223C']}
              style={styles.gradientFill}
            >
              <View style={styles.nodeHeader}>
                <Text style={styles.nodeTitle}>Node D</Text>
                <Text style={styles.nodeStatus}>Status: Online</Text>
              </View>
              <View style={styles.nodeBody}>
                <View style={styles.iconContainer}>
                  <Icon name="hdd-o" size={50} color="#00FF00" />
                </View>
                <View style={styles.nodeInfo}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoText}>Water level: 10 m</Text>
                    <Text style={styles.infoText}>Water flow rate: 1 m³/s</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoText}>Rainfall amount: 2 mm</Text>
                    <Text style={styles.infoText}>Junk Level: 0.5 m</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoText}>
                      Clog status: No clogging
                    </Text>
                    <Text style={styles.infoText}>Battery: 80%</Text>
                  </View>
                  <Text style={styles.systemInsights}>System Insights:</Text>
                  <Text style={styles.insightsText}>
                    No early signs of water overflow
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
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
  shadowWrapper: {
    borderRadius: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: 'transparent',
    marginBottom: 15,
  },
  nodeContainer: {
    width: 360,
    height: 170,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientFill: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
  },
  nodeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nodeTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nodeStatus: {
    color: '#00FF00',
    fontSize: 12,
  },
  nodeStatusOffline: {
    color: '#FF0000',
    fontSize: 12,
  },
  nodeBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 15,
  },
  nodeInfo: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  rightInfo: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  infoText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 3,
  },
  systemInsights: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  insightsText: {
    color: '#aaa',
    fontSize: 11,
    fontStyle: 'italic',
  },
});

export default NodeDetails;

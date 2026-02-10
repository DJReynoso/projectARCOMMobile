import { Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
            ></LinearGradient>
          </View>
        </View>

        <View style={styles.shadowWrapper}>
          <View style={styles.nodeContainer}>
            <LinearGradient
              colors={['#121E33', '#0C1F3E', '#13223C']}
              style={styles.gradientFill}
            ></LinearGradient>
          </View>
        </View>

        <View style={styles.shadowWrapper}>
          <View style={styles.nodeContainer}>
            <LinearGradient
              colors={['#121E33', '#0C1F3E', '#13223C']}
              style={styles.gradientFill}
            ></LinearGradient>
          </View>
        </View>

        <View style={styles.shadowWrapper}>
          <View style={styles.nodeContainer}>
            <LinearGradient
              colors={['#121E33', '#0C1F3E', '#13223C']}
              style={styles.gradientFill}
            ></LinearGradient>
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
  },
});

export default NodeDetails;

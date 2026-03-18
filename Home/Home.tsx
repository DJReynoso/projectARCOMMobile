import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

function Home() {
  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.mainTitle}>
            Stay Safe with Real-time Overflow and Clog Alerts
          </Text>
          <Text style={styles.subtitle}>
            Automated Risk Clog and Overflow Monitoring to Protect your Communities
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Key Features</Text>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Icon name="git-network-outline" size={40} color="#3b82f6" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Node Details</Text>
              <Text style={styles.featureDesc}>
                View real-time node status and monitoring data
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Icon name="notifications-outline" size={40} color="#3b82f6" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Real-time Alerts</Text>
              <Text style={styles.featureDesc}>
                Instant notifications on your phone
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Icon name="trending-up-outline" size={40} color="#3b82f6" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Accurate Prediction</Text>
              <Text style={styles.featureDesc}>
                Provide early warnings
              </Text>
            </View>
          </View>
        </View>

        {/* How it Works Section */}
        <View style={styles.howItWorksSection}>
          <Text style={styles.sectionTitle}>How it Works</Text>
          <Text style={styles.howItWorksSubtitle}>Stay ahead of Rising Waters</Text>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <View style={styles.stepIconContainer}>
                <Icon name="eye-outline" size={32} color="#3b82f6" />
              </View>
              <Text style={styles.stepTitle}>Monitor</Text>
              <Text style={styles.stepDesc}>
                Continuous monitoring of drainage overflow and clog status
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <View style={styles.stepIconContainer}>
                <Icon name="flash-outline" size={32} color="#3b82f6" />
              </View>
              <Text style={styles.stepTitle}>Predict</Text>
              <Text style={styles.stepDesc}>
                Machine learning predicts overflow and detects anomalies
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <View style={styles.stepIconContainer}>
                <Icon name="alert-circle-outline" size={32} color="#3b82f6" />
              </View>
              <Text style={styles.stepTitle}>Alert Workers</Text>
              <Text style={styles.stepDesc}>
                Workers are notified and confirm response status
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepText}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <View style={styles.stepIconContainer}>
                <Icon name="people-outline" size={32} color="#3b82f6" />
              </View>
              <Text style={styles.stepTitle}>Notify Public</Text>
              <Text style={styles.stepDesc}>
                Public users receive real-time alerts and updates
              </Text>
            </View>
          </View>
        </View>

        {/* Footer Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
  },
  mainTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    color: '#b4b4b4',
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    paddingHorizontal: 16,
    marginBottom: 40,
    gap: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(20, 33, 64, 0.8)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    alignItems: 'flex-start',
    gap: 16,
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  featureDesc: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  howItWorksSection: {
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  howItWorksSubtitle: {
    color: '#b4b4b4',
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 24,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(20, 33, 64, 0.6)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    gap: 16,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    color: '#3b82f6',
    fontSize: 18,
    fontWeight: '700',
  },
  stepContent: {
    flex: 1,
    alignItems: 'center',
  },
  stepIconContainer: {
    marginBottom: 8,
  },
  stepTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  stepDesc: {
    color: '#9ca3af',
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default Home;

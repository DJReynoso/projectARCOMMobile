import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const sampleSensors = [
  {
    _id: '1',
    location: 'USLS',
    timestamp: new Date().toISOString(),
    batteryPercent: 100,
    distance: 184,
    water_level: 186.13,
    flow_rate: 0.14,
    status: 0,
  },
];

function NodeDetails() {
  const getStatusLabel = (status: number) => {
    switch (status) {
      case 0:
        return 'Normal';
      case 1:
        return 'At Risk';
      case 2:
        return 'Clogged';
      case 3:
        return 'Overflow';
      default:
        return 'Normal';
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return '#34D399';
      case 1:
        return '#FBBF24';
      case 2:
        return '#F87171';
      case 3:
        return '#A78BFA';
      default:
        return '#34D399';
    }
  };

  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Node Details</Text>
        </View>

        {sampleSensors.map(sensor => (
          <View key={sensor._id} style={styles.cardWrapper}>
            <LinearGradient
              colors={['#121E33', '#0C1F3E', '#13223C']}
              style={styles.card}
            >
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(sensor.status) + '22' },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusBadgeText,
                      { color: getStatusColor(sensor.status) },
                    ]}
                  >
                    {getStatusLabel(sensor.status).toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.timestamp}>
                  {new Date(sensor.timestamp).toLocaleString()}
                </Text>
              </View>

              {/* Metrics Grid */}
              <View style={styles.metricsGrid}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Node Location</Text>
                  <Text style={styles.metricValue}>{sensor.location}</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Status</Text>
                  <Text
                    style={[
                      styles.metricValue,
                      { color: getStatusColor(sensor.status) },
                    ]}
                  >
                    {getStatusLabel(sensor.status)}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Battery</Text>
                  <Text style={styles.metricValue}>
                    {sensor.batteryPercent}%
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Clog Status</Text>
                  <Text style={styles.metricValue}>{sensor.distance} cm</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Water Level</Text>
                  <Text style={styles.metricValue}>
                    {sensor.water_level.toFixed(2)} cm
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Water Flow</Text>
                  <Text style={styles.metricValue}>
                    {sensor.flow_rate} cm/s
                  </Text>
                </View>
              </View>

              {/* Insights */}
              <View style={styles.insightsSection}>
                <Text style={styles.insightsTitle}>
                  System Prediction & Insights
                </Text>
                <Text style={styles.insightsText}>
                  No prediction data available. Historical trends analysis can
                  provide predictive insights.
                </Text>
              </View>

              {/* Actions */}
              <TouchableOpacity style={styles.trendsButton}>
                <Icon name="trending-up-outline" size={16} color="#fff" />
                <Text style={styles.trendsButtonText}>
                  View Historical Trends
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  pageTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardWrapper: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
  },
  card: { 
    borderRadius: 16, 
    padding: 20, 
    backgroundColor: 'rgba(18, 30, 51, 0.85)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusBadge: { 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 8,
  },
  statusBadgeText: { fontSize: 12, fontWeight: '700' },
  timestamp: { color: '#6B7280', fontSize: 11 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  metricItem: { width: '50%', paddingVertical: 12, paddingRight: 12 },
  metricLabel: { color: '#9CA3AF', fontSize: 12, fontWeight: '400', marginBottom: 6 },
  metricValue: { color: '#fff', fontSize: 16, fontWeight: '700' },
  insightsSection: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 16,
    marginBottom: 16,
  },
  insightsTitle: {
    color: '#d1fae5',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  insightsText: { color: '#9CA3AF', fontSize: 13, lineHeight: 20 },
  trendsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 12,
  },
  trendsButtonText: { color: '#fff', fontSize: 13, fontWeight: '600' },
});

export default NodeDetails;

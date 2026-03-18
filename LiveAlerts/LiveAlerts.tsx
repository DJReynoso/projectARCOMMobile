import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BASE_URL = 'http://10.0.2.2:5001';

const STATE_META: Record<string, { label: string; color: string }> = {
  overflow: { label: 'Overflow', color: '#9C27B0' },
  clogged: { label: 'Clogged', color: '#F44336' },
  at_risk: { label: 'At Risk', color: '#FF9800' },
  warning: { label: 'Warning', color: '#FFEB3B' },
  optimal: { label: 'Optimal', color: '#4CAF50' },
};

function getStateMeta(mlState: string) {
  return STATE_META[mlState] || { label: mlState || 'Unknown', color: '#90A4AE' };
}

function formatEta(record: any): string | null {
  if (
    record.ml_state === 'at_risk' &&
    record.estimated_time_to_overflow_min != null
  ) {
    return `~${record.estimated_time_to_overflow_min.toFixed(1)} min to overflow`;
  }
  if (
    record.ml_state === 'warning' &&
    record.estimated_time_to_at_risk_min != null
  ) {
    return `~${record.estimated_time_to_at_risk_min.toFixed(1)} min to at-risk`;
  }
  if (record.ml_state === 'overflow') {
    return 'Overflow in progress';
  }
  return null;
}

function predictionKey(record: any): string {
  return `${record.sensor_id || 'Sensor'}::${record.ml_state || 'unknown'}`;
}

function sortByNewest(records: any[]): any[] {
  return [...records].sort((a, b) => {
    const aTime = new Date(a.createdAt || 0).getTime();
    const bTime = new Date(b.createdAt || 0).getTime();
    return bTime - aTime;
  });
}

function mergePredictions(records: any[]): any[] {
  const mergedMap = new Map();
  for (const record of records) {
    if (!record?.ml_state) continue;
    const key = predictionKey(record);
    const existing = mergedMap.get(key);
    if (!existing) {
      mergedMap.set(key, record);
      continue;
    }
    const existingTime = new Date(existing.createdAt || 0).getTime();
    const currentTime = new Date(record.createdAt || 0).getTime();
    if (currentTime >= existingTime) {
      mergedMap.set(key, record);
    }
  }
  return sortByNewest(Array.from(mergedMap.values()));
}

function upsertPrediction(existing: any[], incoming: any): any[] {
  if (!incoming?.ml_state) {
    return existing;
  }

  const key = predictionKey(incoming);
  const index = existing.findIndex((item) => predictionKey(item) === key);
  if (index === -1) {
    return sortByNewest([incoming, ...existing]);
  }

  const updated = [...existing];
  updated[index] = incoming;
  return sortByNewest(updated);
}

function LiveAlerts() {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/public/predictions?limit=50`);
        if (res.ok) {
          const data = await res.json();
          const rawPredictions = Array.isArray(data) ? data : data.value || [];
          setPredictions(mergePredictions(rawPredictions));
          setError(null);
        }
      } catch (err: any) {
        console.error('Error fetching predictions:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
    const interval = setInterval(fetchPredictions, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStateIcon = (mlState: string) => {
    switch (mlState) {
      case 'overflow':
        return 'alert-circle';
      case 'at_risk':
        return 'alert-outline';
      case 'warning':
        return 'alert';
      case 'optimal':
        return 'check-circle';
      default:
        return 'information';
    }
  };

  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <View style={styles.liveIndicator} />
          <Text style={styles.pageTitle}>Live Alerts Feed</Text>
        </View>
        <Text style={styles.headerSubtitle}>Real-time Sensor Predictions</Text>
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator color="#fff" size="large" />
          <Text style={styles.loadingText}>Loading alerts...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContent}>
          <Icon name="alert-circle" size={48} color="#ef4444" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {predictions.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Icon name="information-outline" size={48} color="#9ca3af" />
              <Text style={styles.emptyText}>No predictions yet</Text>
              <Text style={styles.emptySubtext}>
                Alerts will appear here as they are detected
              </Text>
            </View>
          ) : (
            predictions.map((record: any) => {
              const state = getStateMeta(record.ml_state);
              const eta = formatEta(record);
              const icon = getStateIcon(record.ml_state);
              const textColor = record.ml_state === 'warning' ? '#000' : '#fff';

              return (
                <View key={record._id} style={styles.alertCard}>
                  <View style={styles.alertHeader}>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: state.color },
                      ]}
                    >
                      <Icon
                        name={icon}
                        size={16}
                        color={textColor}
                        style={styles.statusIcon}
                      />
                      <Text style={[styles.statusLabel, { color: textColor }]}>
                        {state.label}
                      </Text>
                    </View>
                    <Text style={styles.sensorId}>{record.sensor_id || 'Sensor'}</Text>
                  </View>

                  <View style={styles.alertTime}>
                    <Icon name="clock-outline" size={14} color="#9ca3af" />
                    <Text style={styles.timeText}>
                      {new Date(record.createdAt).toLocaleString()}
                    </Text>
                  </View>

                  {eta && (
                    <View style={styles.etaContainer}>
                      <Icon name="timer-outline" size={16} color="#fbbf24" />
                      <Text style={styles.etaText}>{eta}</Text>
                    </View>
                  )}

                  {record.water_level != null && (
                    <View style={styles.dataRow}>
                      <Text style={styles.dataLabel}>Water Level:</Text>
                      <Text style={styles.dataValue}>
                        {record.water_level.toFixed(2)} m
                      </Text>
                    </View>
                  )}

                  {record.flow_rate != null && (
                    <View style={styles.dataRow}>
                      <Text style={styles.dataLabel}>Flow Rate:</Text>
                      <Text style={styles.dataValue}>
                        {record.flow_rate.toFixed(2)} cm/s
                      </Text>
                    </View>
                  )}
                </View>
              );
            })
          )}
          <View style={{ height: 20 }} />
        </ScrollView>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  liveIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  pageTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '400',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 12,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    gap: 12,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 16,
    fontWeight: '500',
  },
  emptySubtext: {
    color: '#6B7280',
    fontSize: 12,
    textAlign: 'center',
  },
  alertCard: {
    backgroundColor: 'rgba(20, 33, 64, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
  },
  statusIcon: {
    marginRight: 2,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  sensorId: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '500',
  },
  alertTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  timeText: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '400',
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderRadius: 6,
    marginBottom: 10,
  },
  etaText: {
    color: '#fbbf24',
    fontSize: 13,
    fontWeight: '500',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  dataLabel: {
    color: '#b4b4b4',
    fontSize: 12,
    fontWeight: '500',
  },
  dataValue: {
    color: '#34d399',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default LiveAlerts;

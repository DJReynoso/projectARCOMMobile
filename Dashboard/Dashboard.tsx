import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const BASE_URL = 'http://10.0.2.2:5001';

function Dashboard() {
  const [latestData, setLatestData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestData(true);
    const interval = setInterval(() => fetchLatestData(false), 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchLatestData = async (isInitial: boolean) => {
    try {
      if (isInitial) setLoading(true);
      const response = await fetch(`${BASE_URL}/api/data/latest`);
      if (response.ok) {
        const data = await response.json();
        setLatestData(data);
      }
    } catch (error) {
      console.error('Error fetching latest data:', error);
    } finally {
      if (isInitial) setLoading(false);
    }
  };

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
        return 'Unknown';
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
        return '#9CA3AF';
    }
  };

  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      <View style={styles.upperContent}>
        {/* Active Nodes Widget */}
        <LinearGradient
          colors={['rgba(12,70,51,0.5)', 'rgba(12,50,40,0.3)']}
          style={styles.widget}
        >
          <Icon name="server-outline" size={28} color="#34D399" />
          <Text style={styles.widgetTitle}>Active Nodes</Text>
          <Text style={styles.widgetCount}>4</Text>
          <Text style={styles.widgetSub}>/ 4 Online</Text>
        </LinearGradient>

        {/* Last Clog Alert Widget */}
        <LinearGradient
          colors={['rgba(70,8,9,0.5)', 'rgba(50,8,8,0.3)']}
          style={styles.widget}
        >
          <Icon name="time-outline" size={28} color="#F87171" />
          <Text style={styles.widgetTitle}>Last Clog Alert</Text>
          <Text style={styles.widgetTime}>12:42</Text>
          <Text style={styles.widgetSub}>Node A: B Segment</Text>
        </LinearGradient>
      </View>

      {/* Live Alerts Feed */}
      <View style={styles.feedContainer}>
        <LinearGradient
          colors={[
            'rgba(18,30,51,0.85)',
            'rgba(12,31,62,0.85)',
            'rgba(19,34,60,0.85)',
          ]}
          style={styles.feedGradient}
        >
          <View style={styles.feedHeader}>
            <View style={styles.liveIndicator} />
            <Text style={styles.feedTitle}>Live Alerts Feed</Text>
          </View>

          {loading ? (
            <ActivityIndicator color="#fff" style={{ marginTop: 30 }} />
          ) : latestData ? (
            <ScrollView
              style={styles.feedScroll}
              contentContainerStyle={styles.feedScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.feedCard}>
                <View style={styles.feedCardRow}>
                  <Text style={styles.feedCardLabel}>Status</Text>
                  <Text
                    style={[
                      styles.feedCardStatus,
                      { color: getStatusColor(latestData.status) },
                    ]}
                  >
                    {getStatusLabel(latestData.status)}
                  </Text>
                </View>
                <View style={styles.feedCardRow}>
                  <Text style={styles.feedCardLabel}>Water Level</Text>
                  <Text style={styles.feedCardValue}>
                    {latestData.water_level?.toFixed(2) ?? 'N/A'} cm
                  </Text>
                </View>
                <View style={styles.feedCardRow}>
                  <Text style={styles.feedCardLabel}>Flow Rate</Text>
                  <Text style={styles.feedCardValue}>
                    {latestData.flow_rate?.toFixed(2) ?? 'N/A'} L/min
                  </Text>
                </View>
                <Text style={styles.feedCardTimestamp}>
                  Last updated:{' '}
                  {new Date(
                    latestData.timestamp || latestData.createdAt,
                  ).toLocaleString()}
                </Text>
              </View>
            </ScrollView>
          ) : (
            <Text style={styles.noDataText}>No live data available</Text>
          )}
        </LinearGradient>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  upperContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 75,
    gap: 12,
    paddingHorizontal: 16,
  },
  widget: {
    flex: 1,
    height: 165,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  widgetTitle: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
  widgetCount: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  widgetTime: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  widgetSub: { color: '#9CA3AF', fontSize: 11 },
  feedContainer: {
    flex: 1,
    margin: 12,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 12,
  },
  feedGradient: { flex: 1, borderRadius: 12, padding: 14 },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  liveIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00FF00',
  },
  feedTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  feedScroll: { flex: 1 },
  feedScrollContent: { paddingBottom: 10 },
  feedCard: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 10,
    padding: 14,
    gap: 10,
  },
  feedCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedCardLabel: { color: '#9CA3AF', fontSize: 13 },
  feedCardStatus: { fontSize: 13, fontWeight: '700' },
  feedCardValue: { color: '#fff', fontSize: 13, fontWeight: '600' },
  feedCardTimestamp: { color: '#6B7280', fontSize: 11, marginTop: 4 },
  noDataText: { color: '#6B7280', textAlign: 'center', marginTop: 30 },
});

export default Dashboard;

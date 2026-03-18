import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const BASE_URL = 'http://10.0.2.2:5001';

interface AlertStats {
  total: number;
  pending: number;
  ongoing: number;
  resolved: number;
}

function Dashboard() {
  const [activeNodes, setActiveNodes] = useState(0);
  const [alertStats, setAlertStats] = useState<AlertStats>({
    total: 0,
    pending: 0,
    ongoing: 0,
    resolved: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const nodesRes = await fetch(`${BASE_URL}/api/public/nodes`);
      if (nodesRes.ok) {
        const nodes = await nodesRes.json();
        setActiveNodes(Array.isArray(nodes) ? nodes.length : 0);
      }

      const alertsRes = await fetch(`${BASE_URL}/api/public/alerts`);
      if (alertsRes.ok) {
        const alerts = await alertsRes.json();
        const pending = alerts.filter(
          (a: any) => a.status === 'pending'
        ).length;
        const ongoing = alerts.filter(
          (a: any) => a.status === 'ongoing'
        ).length;
        const resolved = alerts.filter(
          (a: any) => a.status === 'resolved'
        ).length;
        setAlertStats({
          total: alerts.length,
          pending,
          ongoing,
          resolved,
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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
          <Text style={styles.pageTitle}>Dashboard</Text>
        </View>

        {loading ? (
          <ActivityIndicator color="#4e9eff" size="large" style={{ marginTop: 40 }} />
        ) : (
          <>
            <LinearGradient
              colors={['#122b25', '#0f352b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.activeNodesCard}
            >
              <View style={styles.cardContent}>
                <Icon name="server" size={54} color="#34d399" style={styles.cardIcon} />
                <Text style={styles.cardLabel}>Active Nodes</Text>
                <Text style={styles.cardValue}>{activeNodes}</Text>
                <Text style={styles.cardStatus}>Live</Text>
                <Text style={styles.cardStatusText}>Online</Text>
              </View>
            </LinearGradient>

            <View style={styles.alertsSummaryContainer}>
              <Text style={styles.summaryTitle}>Alert Summary</Text>

              <LinearGradient
                colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
                style={styles.statsCard}
              >
                <View style={styles.statsCardContent}>
                  <View style={styles.statsIcon}>
                    <Icon name="alert-circle-outline" size={24} color="#d1fae5" />
                  </View>
                  <View style={styles.statsText}>
                    <Text style={styles.statsLabel}>Total Alerts</Text>
                    <Text style={styles.statsValue}>{alertStats.total}</Text>
                  </View>
                </View>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0.05)']}
                style={styles.statsCard}
              >
                <View style={styles.statsCardContent}>
                  <View style={[styles.statsIcon, { borderColor: '#ef4444', borderWidth: 2 }]}>
                    <Icon name="alert-outline" size={24} color="#ef4444" />
                  </View>
                  <View style={styles.statsText}>
                    <Text style={styles.statsLabel}>Unresolved</Text>
                    <Text style={styles.statsValue}>{alertStats.pending}</Text>
                  </View>
                </View>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(251, 191, 36, 0.1)', 'rgba(251, 191, 36, 0.05)']}
                style={styles.statsCard}
              >
                <View style={styles.statsCardContent}>
                  <View style={[styles.statsIcon, { borderColor: '#fbbf24', borderWidth: 2 }]}>
                    <Icon name="hourglass-outline" size={24} color="#fbbf24" />
                  </View>
                  <View style={styles.statsText}>
                    <Text style={styles.statsLabel}>Ongoing</Text>
                    <Text style={styles.statsValue}>{alertStats.ongoing}</Text>
                  </View>
                </View>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(16, 185, 129, 0.1)', 'rgba(16, 185, 129, 0.05)']}
                style={styles.statsCard}
              >
                <View style={styles.statsCardContent}>
                  <View style={[styles.statsIcon, { borderColor: '#10b981', borderWidth: 2 }]}>
                    <Icon name="checkmark-circle-outline" size={24} color="#10b981" />
                  </View>
                  <View style={styles.statsText}>
                    <Text style={styles.statsLabel}>Resolved</Text>
                    <Text style={styles.statsValue}>{alertStats.resolved}</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  activeNodesCard: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.24)',
    padding: 24,
    alignItems: 'center',
    minHeight: 280,
    justifyContent: 'center',
    shadowColor: 'rgba(2, 10, 22, 0.45)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 15,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d1fae5',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  cardValue: {
    fontSize: 52,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  cardStatus: {
    fontSize: 14,
    color: 'rgba(209, 250, 229, 0.88)',
    marginBottom: 4,
  },
  cardStatusText: {
    fontSize: 12,
    color: 'rgba(209, 250, 229, 0.74)',
  },
  alertsSummaryContainer: {
    marginHorizontal: 16,
    paddingBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  statsCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    minHeight: 80,
    justifyContent: 'center',
  },
  statsCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statsText: {
    flex: 1,
  },
  statsLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#b4b4b4',
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
});

export default Dashboard;

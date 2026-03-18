import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const BASE_URL = 'http://10.0.2.2:5001';

interface WorkerStats {
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
  alertsCount: number;
}

type TabName = 'Dashboard' | 'Tasks' | 'Alerts';

function WorkerHome() {
  const [activeTab, setActiveTab] = useState<TabName>('Dashboard');
  const [stats, setStats] = useState<WorkerStats>({
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
    alertsCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentTasks, setRecentTasks] = useState<any[]>([]);

  const fetchStats = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('authtoken');
      
      const [tasksRes, alertsRes] = await Promise.all([
        fetch(`${BASE_URL}/api/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${BASE_URL}/api/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (tasksRes.ok) {
        const tasksData = await tasksRes.json();
        const pending = tasksData.filter((t: any) => t.status === 'pending').length;
        const completed = tasksData.filter((t: any) => t.status === 'resolved').length;
        
        setStats({
          totalTasks: tasksData.length,
          pendingTasks: pending,
          completedTasks: completed,
          alertsCount: pending,
        });
        
        setRecentTasks(tasksData.slice(0, 3));
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const renderDashboard = () => (
    <View style={styles.tabContent}>
      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Icon name="checkmark-done-outline" size={28} color="#10b981" />
          </View>
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Total Tasks</Text>
            <Text style={styles.statValue}>{stats.totalTasks}</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Icon name="time-outline" size={28} color="#fbbf24" />
          </View>
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={styles.statValue}>{stats.pendingTasks}</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Icon name="checkmark-circle-outline" size={28} color="#34d399" />
          </View>
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Completed</Text>
            <Text style={styles.statValue}>{stats.completedTasks}</Text>
          </View>
        </View>
      </View>

      {/* Recent Activities */}
      <View style={styles.recentSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Tasks</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllLink}>View All</Text>
          </TouchableOpacity>
        </View>

        {recentTasks.length === 0 ? (
          <Text style={styles.emptyText}>No recent tasks</Text>
        ) : (
          recentTasks.map((task: any) => (
            <View key={task._id} style={styles.taskItem}>
              <View style={styles.taskItemLeft}>
                <Icon 
                  name={task.status === 'resolved' ? 'checkmark-circle' : 'alert-circle'} 
                  size={24} 
                  color={task.status === 'resolved' ? '#10b981' : '#fbbf24'}
                />
              </View>
              <View style={styles.taskItemContent}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskDesc}>{task.description}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: task.status === 'resolved' ? '#10b98133' : '#fbbf2433' }]}>
                <Text style={[styles.statusText, { color: task.status === 'resolved' ? '#10b981' : '#fbbf24' }]}>
                  {task.status}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="list-outline" size={24} color="#fff" />
            <Text style={styles.actionButtonLabel}>View Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="alert-outline" size={24} color="#fff" />
            <Text style={styles.actionButtonLabel}>View Alerts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="git-network-outline" size={24} color="#fff" />
            <Text style={styles.actionButtonLabel}>Node Status</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Worker Dashboard</Text>
        <Text style={styles.headerSubtitle}>Track your tasks and alerts</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {(['Dashboard', 'Tasks', 'Alerts'] as TabName[]).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      ) : (
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {renderDashboard()}
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
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '400',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  tabButtonActive: {
    backgroundColor: 'rgba(78, 158, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#4e9eff',
  },
  tabText: {
    color: '#7a8db5',
    fontSize: 13,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#4e9eff',
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 20,
  },
  statsContainer: {
    gap: 12,
  },
  statCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(20, 33, 64, 0.8)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 12,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    color: '#b4b4b4',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  recentSection: {
    backgroundColor: 'rgba(20, 33, 64, 0.6)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  viewAllLink: {
    color: '#4e9eff',
    fontSize: 13,
    fontWeight: '500',
  },
  emptyText: {
    color: '#6B7280',
    textAlign: 'center',
    paddingVertical: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    gap: 12,
  },
  taskItemLeft: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskItemContent: {
    flex: 1,
  },
  taskTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  taskDesc: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '400',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  quickActionsSection: {
    marginTop: 8,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  actionButtonLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default WorkerHome;

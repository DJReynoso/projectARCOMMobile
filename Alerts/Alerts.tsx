import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BASE_URL = 'http://10.0.2.2:5001';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'ongoing' | 'resolved';
  created_date: string;
  node_id?: { location: string };
}

type TabName = 'Unresolved' | 'Ongoing Fix' | 'Resolved';

function Alerts() {
  const [selectedTab, setSelectedTab] = useState<TabName>('Unresolved');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const token = await AsyncStorage.getItem('authtoken');
      const response = await fetch(`${BASE_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks(true);
  }, [fetchTasks]);

  const handleAcknowledge = async (taskId: string) => {
    try {
      const token = await AsyncStorage.getItem('authtoken');
      const response = await fetch(
        `${BASE_URL}/api/tasks/${taskId}/acknowledge`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to acknowledge');
      }
      await fetchTasks();
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  const handleResolve = async (taskId: string) => {
    try {
      const token = await AsyncStorage.getItem('authtoken');
      const response = await fetch(`${BASE_URL}/api/tasks/${taskId}/resolve`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to resolve');
      }
      await fetchTasks();
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const ongoingTasks = tasks.filter(t => t.status === 'ongoing');
  const resolvedTasks = tasks.filter(t => t.status === 'resolved');

  const displayedTasks =
    selectedTab === 'Unresolved'
      ? pendingTasks
      : selectedTab === 'Ongoing Fix'
      ? ongoingTasks
      : resolvedTasks;

  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Alerts</Text>
        <View style={styles.counters}>
          <View style={styles.counter}>
            <View style={styles.counterIcon}>
              <Icon name="alert-circle-outline" size={24} color="#d1fae5" />
            </View>
            <View style={styles.counterInfo}>
              <Text style={styles.counterLabel}>Total Alerts</Text>
              <Text style={styles.counterValue}>{tasks.length}</Text>
            </View>
          </View>
          <View style={[styles.counter, styles.counterUnresolved]}>
            <View style={styles.counterIcon}>
              <Icon name="alert-outline" size={24} color="#ef4444" />
            </View>
            <View style={styles.counterInfo}>
              <Text style={styles.counterLabel}>Unresolved</Text>
              <Text style={[styles.counterValue, { color: '#ef4444' }]}>
                {pendingTasks.length}
              </Text>
            </View>
          </View>
          <View style={[styles.counter, styles.counterOngoing]}>
            <View style={styles.counterIcon}>
              <Icon name="hourglass-outline" size={24} color="#fbbf24" />
            </View>
            <View style={styles.counterInfo}>
              <Text style={styles.counterLabel}>Ongoing</Text>
              <Text style={[styles.counterValue, { color: '#fbbf24' }]}>
                {ongoingTasks.length}
              </Text>
            </View>
          </View>
          <View style={[styles.counter, styles.counterResolved]}>
            <View style={styles.counterIcon}>
              <Icon name="checkmark-circle-outline" size={24} color="#10b981" />
            </View>
            <View style={styles.counterInfo}>
              <Text style={styles.counterLabel}>Resolved</Text>
              <Text style={[styles.counterValue, { color: '#10b981' }]}>
                {resolvedTasks.length}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabContainer}>
        {(['Unresolved', 'Ongoing Fix', 'Resolved'] as TabName[]).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.tabButtonActive,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator color="#fff" style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {displayedTasks.length === 0 ? (
            <Text style={styles.emptyText}>
              No {selectedTab.toLowerCase()} alerts.
            </Text>
          ) : (
            displayedTasks.map(task => (
              <View key={task._id} style={styles.taskCard}>
                <View style={styles.taskCardHeader}>
                  <Text style={styles.taskDate}>
                    {new Date(task.created_date).toLocaleString()}
                  </Text>
                  {task.node_id?.location && (
                    <Text style={styles.taskNode}>{task.node_id.location}</Text>
                  )}
                </View>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskDesc}>{task.description}</Text>
                {task.status === 'pending' && (
                  <View style={styles.taskActions}>
                    <TouchableOpacity
                      style={styles.acknowledgeBtn}
                      onPress={() => handleAcknowledge(task._id)}
                    >
                      <Text style={styles.actionBtnText}>Acknowledge</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {task.status === 'ongoing' && (
                  <View style={styles.taskActions}>
                    <TouchableOpacity
                      style={styles.resolveBtn}
                      onPress={() => handleResolve(task._id)}
                    >
                      <Text style={styles.actionBtnText}>Resolve</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
        </ScrollView>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 12 },
  pageTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  counters: { flexDirection: 'column', gap: 12 },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    minHeight: 80,
  },
  counterIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  counterInfo: {
    flex: 1,
  },
  counterUnresolved: { borderTopWidth: 2, borderTopColor: '#ef4444' },
  counterOngoing: { borderTopWidth: 2, borderTopColor: '#fbbf24' },
  counterResolved: { borderTopWidth: 2, borderTopColor: '#10b981' },
  counterLabel: { color: '#b4b4b4', fontSize: 12, fontWeight: '400', marginBottom: 4 },
  counterValue: { color: '#fff', fontSize: 20, fontWeight: '700' },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  tabButtonActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#4e9eff',
  },
  tabText: { color: '#7a8db5', fontSize: 13, fontWeight: '500' },
  tabTextActive: { color: '#fff', fontWeight: '600' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 20 },
  emptyText: { color: '#6B7280', textAlign: 'center', marginTop: 30 },
  errorText: { color: '#F87171', textAlign: 'center', marginTop: 30 },
  taskCard: {
    backgroundColor: 'rgba(26, 41, 66, 0.8)',
    borderRadiusRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  taskCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  taskDate: { color: '#6B7280', fontSize: 11 },
  taskNode: { color: '#60A5FA', fontSize: 11, fontWeight: '600', backgroundColor: 'rgba(96, 165, 250, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  taskTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  taskDesc: { color: '#9CA3AF', fontSize: 13, marginBottom: 12, lineHeight: 18 },
  taskActions: { flexDirection: 'row', gap: 8 },
  acknowledgeBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resolveBtn: {
    backgroundColor: '#059669',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionBtnText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});

export default Alerts;

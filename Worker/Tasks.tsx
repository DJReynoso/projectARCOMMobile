import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.0.2.2:5001';

interface Task {
  _id: string;
  title: string;
  status: string;
  node_id?: { location: string };
  assigned_to?: { first_name: string; last_name: string };
}

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('authtoken');
        const response = await fetch(`${BASE_URL}/api/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data.filter((t: Task) => t.assigned_to));
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <LinearGradient
      colors={['#020E2A', '#0F172A', '#0B2154']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Tasks</Text>
      </View>

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
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.colHeader, { flex: 1.2 }]}>Node Location</Text>
            <Text style={[styles.colHeader, { flex: 2 }]}>Description</Text>
            <Text style={[styles.colHeader, { flex: 1.5 }]}>Assigned To</Text>
          </View>

          {tasks.length === 0 ? (
            <Text style={styles.emptyText}>No tasks found.</Text>
          ) : (
            tasks.map(task => (
              <View key={task._id} style={styles.tableRow}>
                <Text style={[styles.cellText, { flex: 1.2 }]}>
                  {task.node_id?.location ?? '—'}
                </Text>
                <Text style={[styles.cellText, { flex: 2 }]}>{task.title}</Text>
                <Text style={[styles.cellText, { flex: 1.5 }]}>
                  {task.assigned_to
                    ? `${task.assigned_to.first_name} ${task.assigned_to.last_name}`
                    : '—'}
                </Text>
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
  pageTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 12, paddingBottom: 20 },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  colHeader: { color: '#9CA3AF', fontSize: 11, fontWeight: '700' },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.07)',
  },
  cellText: { color: '#fff', fontSize: 12 },
  emptyText: { color: '#6B7280', textAlign: 'center', marginTop: 30 },
  errorText: { color: '#F87171', textAlign: 'center', marginTop: 30 },
});

export default Tasks;

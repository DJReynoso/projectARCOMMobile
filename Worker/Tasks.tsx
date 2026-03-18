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
        <ActivityIndicator color="#4e9eff" size="large" style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {tasks.length === 0 ? (
            <Text style={styles.emptyText}>No tasks assigned to you.</Text>
          ) : (
            tasks.map(task => (
              <View key={task._id} style={styles.taskCard}>
                <View style={styles.taskCardHeader}>
                  <View style={styles.taskNodeBadge}>
                    <Text style={styles.taskNodeText}>
                      {task.node_id?.location ?? 'Unknown'}
                    </Text>
                  </View>
                  {task.assigned_to && (
                    <Text style={styles.taskAssignedText}>
                      {task.assigned_to.first_name} {task.assigned_to.last_name}
                    </Text>
                  )}
                </View>
                <Text style={styles.taskTitle}>{task.title}</Text>
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
  header: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 24 },
  pageTitle: { 
    color: '#fff', 
    fontSize: 28, 
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },
  taskCard: {
    backgroundColor: 'rgba(26, 41, 66, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4e9eff',
  },
  taskCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskNodeBadge: {
    backgroundColor: 'rgba(96, 165, 250, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.4)',
  },
  taskNodeText: {
    color: '#60A5FA',
    fontSize: 12,
    fontWeight: '600',
  },
  taskAssignedText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  taskTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  emptyText: { color: '#6B7280', textAlign: 'center', marginTop: 40, fontSize: 14 },
  errorText: { color: '#F87171', textAlign: 'center', marginTop: 30, fontSize: 14 },
});

export default Tasks;

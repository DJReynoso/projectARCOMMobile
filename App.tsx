import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthProvider, useAuth } from './store/AuthContext';
import Dashboard from './Dashboard/Dashboard';
import NodeDetails from './NodeDetails/NodeDetails';
import Alerts from './Alerts/Alerts';
import Tasks from './Worker/Tasks';
import WorkerLogin from './Worker/WorkerLogin';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Dashboard Stack Navigator
function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardHome" component={Dashboard} />
    </Stack.Navigator>
  );
}

// NodeDetails Stack Navigator
function NodeDetailsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NodeDetailsHome" component={NodeDetails} />
    </Stack.Navigator>
  );
}

// Alerts Stack Navigator
function AlertsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AlertsHome" component={Alerts} />
    </Stack.Navigator>
  );
}

// Tasks Stack Navigator
function TasksStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TasksHome" component={Tasks} />
    </Stack.Navigator>
  );
}

// Worker Login Stack Navigator
function WorkerLoginStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WorkerLoginHome" component={WorkerLogin} />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function MainTabs() {
  const { isWorker } = useAuth();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#142140',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIconStyle: {
          marginBottom: -5,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Icon name="grid-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="NodeDetails"
        component={NodeDetailsStack}
        options={{
          tabBarLabel: 'Node Details',
          tabBarIcon: ({ color, size }) => (
            <Icon name="list-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Alerts"
        component={AlertsStack}
        options={{
          tabBarLabel: 'Alerts',
          tabBarIcon: ({ color, size }) => (
            <Icon name="notifications-outline" color={color} size={size} />
          ),
        }}
      />
      {isWorker && (
        <Tab.Screen
          name="Tasks"
          component={TasksStack}
          options={{
            tabBarLabel: 'Tasks',
            tabBarIcon: ({ color, size }) => (
              <Icon name="checkbox-outline" color={color} size={size} />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="WorkerLogin"
        component={WorkerLoginStack}
        options={{
          tabBarLabel: isWorker ? 'Worker' : 'Login as Worker',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={isWorker ? 'person-circle-outline' : 'log-in-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Root Navigator
function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainApp"
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
        >
          <Stack.Screen name="MainApp" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;

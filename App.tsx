import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardAnimationContext,
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard/Dashboard';
import NodeDetails from './NodeDetails/NodeDetails';
import Alerts from './Alerts/Alerts';
import AdminLogin from './Admin/AdminLogin';
import AdminDashboard from './Admin/AdminDashboard';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Dashboard Stack Navigator
function DashboardStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DashboardHome" component={Dashboard} />
    </Stack.Navigator>
  );
}

// NodeDetails Stack Navigator
function NodeDetailsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="NodeDetailsHome" component={NodeDetails} />
    </Stack.Navigator>
  );
}

// Alerts Stack Navigator
function AlertsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AlertsHome" component={Alerts} />
    </Stack.Navigator>
  );
}

// AdminLogin Stack Navigator
function AdminLoginStack() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('authtoken');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Error checking auth:', error);
      setIsAuthenticated(false);
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AdminHome">
        {() => (isAuthenticated ? <AdminDashboard /> : <AdminLogin />)}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function MainTabs() {
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
      <Tab.Screen
        name="Admin"
        component={AdminLoginStack}
        options={{
          tabBarLabel: 'Admin',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Root Navigator
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainApp"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
        }}
      >
        {/* Main App with Bottom Tabs - Default for guest users */}
        <Stack.Screen name="MainApp" component={MainTabs} />

        {/* Auth Screens - Only accessible from Admin tab */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />

        {/* Admin Dashboard - Accessible after authentication */}
        <Stack.Screen name="Admin Dashboard" component={AdminDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

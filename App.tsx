import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthProvider, useAuth } from './store/AuthContext';
import {
  initNotifications,
  sendTestNotification,
} from './utils/NotificationService';
import Dashboard from './Dashboard/Dashboard';
import NodeDetails from './NodeDetails/NodeDetails';
import Alerts from './Alerts/Alerts';
import Tasks from './Worker/Tasks';
import WorkerLogin from './Worker/WorkerLogin';
import Home from './Home/Home';
import WorkerHome from './Worker/WorkerHome';
import LiveAlerts from './LiveAlerts/LiveAlerts';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Home Stack Navigator
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home} />
    </Stack.Navigator>
  );
}

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

// Live Alerts Stack Navigator
function LiveAlertsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LiveAlertsScreen" component={LiveAlerts} />
    </Stack.Navigator>
  );
}

// Worker Home Stack Navigator
function WorkerHomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WorkerHomeScreen" component={WorkerHome} />
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
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#4e9eff',
        tabBarInactiveTintColor: '#7a8db5',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: -5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={isWorker ? WorkerHomeStack : HomeStack}
        options={{
          tabBarLabel: isWorker ? 'Home' : 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      {!isWorker && (
        <>
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
            name="LiveAlerts"
            component={LiveAlertsStack}
            options={{
              tabBarLabel: 'Live Feed',
              tabBarIcon: ({ color, size }) => (
                <Icon name="broadcast" color={color} size={size} />
              ),
            }}
          />
        </>
      )}
      {isWorker && (
        <>
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
        </>
      )}
      <Tab.Screen
        name="WorkerLogin"
        component={WorkerLoginStack}
        options={{
          tabBarLabel: isWorker ? 'Account' : 'Login',
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
  useEffect(() => {
    // Initialize push notifications on app start
    void initNotifications().then(() => {
      setTimeout(() => {
        sendTestNotification();
      }, 1500);
    });
  }, []);

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

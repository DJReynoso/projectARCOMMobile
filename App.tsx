import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardAnimationContext,
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard/Dashboard';
import NodeDetails from './NodeDetails/NodeDetails';
import Alerts from './Alerts/Alerts';
import Profile from './Profile/Profile';

const Stack = createStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
        >
          {/* Auth Screens - No Navigation Bar */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />

          {/* Main App Screens - With Navigation Bar */}
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="NodeDetails" component={NodeDetails} />
          <Stack.Screen name="Alerts" component={Alerts} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;

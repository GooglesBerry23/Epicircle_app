// customer-app/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import OTPScreen from './screens/OTPScreen';
import Dashboard from './screens/Dashboard';
import SchedulePickup from './screens/SchedulePickup';
import OrderHistory from './screens/OrderHistory';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="SchedulePickup" component={SchedulePickup} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


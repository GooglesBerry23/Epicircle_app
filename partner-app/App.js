// partner-app/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import OTPScreen from './screens/OTPScreen';
import AssignedPickups from './screens/AssignedPickups';
import PickupDetails from './screens/PickupDetails';
import AddItemDetails from './screens/AddItemDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="AssignedPickups" component={AssignedPickups} />
        <Stack.Screen name="PickupDetails" component={PickupDetails} />
        <Stack.Screen name="AddItemDetails" component={AddItemDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

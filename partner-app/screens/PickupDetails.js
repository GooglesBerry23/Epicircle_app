// screens/PickupDetails.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PickupDetails({ route, navigation }) {
  const { pickup } = route.params;
  const [pickupCode, setPickupCode] = useState('');

  const updateStatus = async (newStatus) => {
    const all = await AsyncStorage.getItem('pickups');
    let pickups = JSON.parse(all);
    pickups = pickups.map((p) => {
      if (p.id === pickup.id) {
        return { ...p, status: newStatus };
      }
      return p;
    });
    await AsyncStorage.setItem('pickups', JSON.stringify(pickups));
    Alert.alert(`Status Updated: ${newStatus}`);
    if (newStatus === 'In-Process') {
      navigation.navigate('AddItemDetails', { pickupId: pickup.id });
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold' }}>Pickup for: {pickup.address}</Text>
      <Text>Status: {pickup.status}</Text>

      {pickup.status === 'Pending' && (
        <Button title="Accept Pickup" onPress={() => updateStatus('Accepted')} />
      )}

      {pickup.status === 'Accepted' && (
        <>
          <Text>Enter Pickup Code (from customer)</Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="Pickup Code"
            value={pickupCode}
            onChangeText={setPickupCode}
            style={{ borderBottomWidth: 1, marginVertical: 10 }}
          />
          <Button
            title="Start Pickup"
            onPress={() => {
              const expectedCode = pickup.id.toString().slice(-6);
              if (pickupCode === expectedCode) {
                updateStatus('In-Process');
              } else {
                Alert.alert('Incorrect Code');
              }
            }}
          />
        </>
      )}
    </View>
  );
}

// screens/AssignedPickups.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AssignedPickups({ navigation }) {
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem('pickups');
      if (data) {
        const all = JSON.parse(data);
        const active = all.filter((p) => p.status !== 'Completed');
        setPickups(active);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Assigned Pickups</Text>
      <FlatList
        data={pickups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ borderBottomWidth: 1, padding: 10 }}>
            <Text>Date: {item.date}</Text>
            <Text>Time: {item.timeSlot}</Text>
            <Text>Address: {item.address}</Text>
            <Text>Status: {item.status}</Text>
            <Button
              title="View Details"
              onPress={() => navigation.navigate('PickupDetails', { pickup: item })}
            />
          </View>
        )}
      />
    </View>
  );
}

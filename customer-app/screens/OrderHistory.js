import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getPickups } from '../services/api';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getPickups().then(res => setOrders(res.data));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.date} | {item.timeSlot}</Text>
            <Text>{item.address}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

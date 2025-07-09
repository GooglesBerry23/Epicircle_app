// screens/AddItemDetails.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddItemDetails({ route, navigation }) {
  const { pickupId } = route.params;
  const [item, setItem] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (item && qty && price) {
      setItems([...items, { item, qty, price }]);
      setItem('');
      setQty('');
      setPrice('');
    }
  };

  const submitForApproval = async () => {
    const total = items.reduce((sum, i) => sum + parseFloat(i.price), 0);
    const all = await AsyncStorage.getItem('pickups');
    let pickups = JSON.parse(all);
    pickups = pickups.map((p) => {
      if (p.id === pickupId) {
        return { ...p, status: 'Pending for Approval', items, totalAmount: total };
      }
      return p;
    });
    await AsyncStorage.setItem('pickups', JSON.stringify(pickups));
    Alert.alert('Submitted for Customer Approval');
    navigation.navigate('AssignedPickups');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Add Item</Text>
      <TextInput placeholder="Item Name" value={item} onChangeText={setItem} />
      <TextInput placeholder="Qty" value={qty} onChangeText={setQty} keyboardType="numeric" />
      <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <Button title="Add" onPress={addItem} />

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Items Added:</Text>
      {items.map((i, idx) => (
        <Text key={idx}>{i.item} x{i.qty} = ₹{i.price}</Text>
      ))}

      {items.length > 0 && (
        <Button title="Submit for Approval" onPress={submitForApproval} />
      )}
    </View>
  );
}

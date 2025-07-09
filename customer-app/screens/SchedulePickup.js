// screens/SchedulePickup.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

const timeSlots = ['10–11 AM', '12–1 PM', '2–3 PM', '4–5 PM'];

export default function SchedulePickup({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeSlot, setTimeSlot] = useState(timeSlots[0]);
  const [address, setAddress] = useState('');
  const [mapLink, setMapLink] = useState('');

  const handleSubmit = async () => {
    const pickup = {
      id: Date.now(),
      date: format(date, 'yyyy-MM-dd'),
      timeSlot,
      address,
      mapLink,
      status: 'Pending',
    };

    try {
      const existing = await AsyncStorage.getItem('pickups');
      const pickups = existing ? JSON.parse(existing) : [];
      pickups.push(pickup);
      await AsyncStorage.setItem('pickups', JSON.stringify(pickups));
      Alert.alert('Pickup Scheduled!', '', [
        { text: 'OK', onPress: () => navigation.navigate('Dashboard') },
      ]);
    } catch (e) {
      console.log(e);
      Alert.alert('Error saving pickup');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>Select Pickup Date</Text>
      <Button title={format(date, 'yyyy-MM-dd')} onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(false);
            setDate(currentDate);
          }}
        />
      )}

      <Text style={{ marginTop: 20 }}>Select Time Slot</Text>
      {timeSlots.map((slot, i) => (
        <Button
          key={i}
          title={slot}
          color={timeSlot === slot ? 'green' : 'gray'}
          onPress={() => setTimeSlot(slot)}
        />
      ))}

      <TextInput
        placeholder="Enter Address"
        value={address}
        onChangeText={setAddress}
        style={{ borderBottomWidth: 1, marginTop: 20 }}
      />
      <TextInput
        placeholder="Google Map Link (optional)"
        value={mapLink}
        onChangeText={setMapLink}
        style={{ borderBottomWidth: 1, marginTop: 10 }}
      />

      <Button title="Submit Pickup Request" onPress={handleSubmit} style={{ marginTop: 20 }} />
    </View>
  );
}

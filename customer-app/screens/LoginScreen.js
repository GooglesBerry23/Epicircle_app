// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    // Store phone temporarily (can also be passed via route)
    navigation.navigate('OTP', { phone });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter Phone Number:</Text>
      <TextInput
        keyboardType="number-pad"
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone Number"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Continue" onPress={handleSubmit} />
    </View>
  );
}

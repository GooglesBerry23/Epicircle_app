// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Text, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter Phone Number:</Text>
      <TextInput
        keyboardType="number-pad"
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Continue" onPress={() => navigation.navigate('OTP', { phone })} />
    </View>
  );
}

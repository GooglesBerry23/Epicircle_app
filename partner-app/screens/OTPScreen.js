// screens/OTPScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OTPScreen({ route, navigation }) {
  const [otp, setOtp] = useState('');
  const { phone } = route.params;

  const handleVerify = async () => {
    if (otp === '123456') {
      await AsyncStorage.setItem('partnerSession', phone);
      navigation.replace('AssignedPickups');
    } else {
      Alert.alert('Incorrect OTP');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter OTP for {phone}</Text>
      <TextInput
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
        placeholder="OTP"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Verify OTP" onPress={handleVerify} />
    </View>
  );
}

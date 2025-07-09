import { createPickup } from '../services/api';

const handleSubmit = async () => {
  const pickup = {
    date,
    timeSlot,
    address,
    mapLink,
    status: 'Pending'
  };
  await createPickup(pickup);
  Alert.alert('Pickup Created!');
  navigation.navigate('Dashboard');
};

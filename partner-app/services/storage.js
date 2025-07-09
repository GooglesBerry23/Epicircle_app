import { updatePickupStatus } from '../services/api';

const acceptPickup = async (pickupId) => {
  await updatePickupStatus(pickupId, { status: 'Accepted' });
};

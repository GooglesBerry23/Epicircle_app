// customer-app/services/api.js (or partner-app/services/api.js)
import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // use your LAN IP if testing on physical device

export const createPickup = (data) => axios.post(`${BASE_URL}/pickups`, data);

export const getPickups = () => axios.get(`${BASE_URL}/pickups`);

export const updatePickupStatus = (id, update) =>
  axios.patch(`${BASE_URL}/pickups/${id}`, update);

// src/services/api.js
import axios from 'axios';

// Point to Flask backend
const API_BASE = 'http://localhost:5000';

export const PriceService = {
  getPrices: () => axios.get(`${API_BASE}/api/prices`)
};

export const EventService = {
  getEvents: () => axios.get(`${API_BASE}/api/events`)
};

export const ChangePointService = {
  getChangePoints: () => axios.get(`${API_BASE}/api/change_points`)
};

export const SummaryService = {
  getSummary: () => axios.get(`${API_BASE}/api/summary`)
};
// src/services/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const PriceService = {
  getPrices: () => axios.get(`${API_BASE}/api/prices`).then(res => res.data)
};

export const EventService = {
  getEvents: () => axios.get(`${API_BASE}/api/events`).then(res => res.data)
};

export const ChangePointService = {
  getChangePoints: () => axios.get(`${API_BASE}/api/change_points`).then(res => res.data)
};

export const SummaryService = {
  getSummary: () => axios.get(`${API_BASE}/api/summary`).then(res => res.data)
};
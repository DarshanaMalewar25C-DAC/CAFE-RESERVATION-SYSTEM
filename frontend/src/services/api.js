import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

export const tableAPI = {
  getTables: () => api.get('/tables'),
  getAvailableTables: (date, time) => api.get(`/tables/available?date=${date}&time=${time}`),
};

export const bookingAPI = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getUserBookings: () => api.get('/bookings/user'),
  getAllBookings: () => api.get('/bookings/admin'),
  updateBookingStatus: (id, status) => api.put(`/bookings/${id}/status`, { status }),
};

export const uploadAPI = {
  uploadImage: (formData) => api.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const menuAPI = {
  getMenuItems: () => api.get('/menu'),
  addMenuItem: (itemData) => api.post('/menu', itemData),
  updateMenuItem: (id, itemData) => api.put(`/menu/${id}`, itemData),
  deleteMenuItem: (id) => api.delete(`/menu/${id}`),
};

export const feedbackAPI = {
  submitFeedback: (feedbackData) => api.post('/feedback', feedbackData),
  getUserFeedback: () => api.get('/feedback/user'),
  getAllFeedback: () => api.get('/feedback/admin'),
};

export const paymentAPI = {
  createPayment: (paymentData) => api.post('/payments', paymentData),
  getUserPayments: () => api.get('/payments/user'),
  getAllPayments: () => api.get('/payments/admin'),
  updatePaymentStatus: (id, status) => api.put(`/payments/${id}/status`, { status }),
};

export const adminAPI = {
  addTable: (tableData) => api.post('/tables', tableData),
  updateTable: (id, tableData) => api.put(`/tables/${id}`, tableData),
  deleteTable: (id) => api.delete(`/tables/${id}`),
  getTableStatus: (params = '') => api.get(`/tables/status${params}`),
  deleteBooking: (id) => api.delete(`/bookings/${id}`),
  getDashboardStats: () => api.get('/dashboard/stats'),
};

export default api;
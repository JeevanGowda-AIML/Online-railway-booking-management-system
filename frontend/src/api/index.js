import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

export const fetchTrains = (source, destination) => 
    axios.get(`${API_URL}/trains`, { params: { source, destination } });

export const fetchTrainById = (id) => 
    axios.get(`${API_URL}/trains/${id}`);

export const createBooking = (bookingData) => 
    axios.post(`${API_URL}/bookings`, bookingData);

export const fetchUserBookings = (userId) => 
    axios.get(`${API_URL}/bookings/user/${userId}`);

export const loginUser = (credentials) => 
    axios.post(`${API_URL}/login`, credentials);

export const registerUser = (userData) => 
    axios.post(`${API_URL}/register`, userData);

export const addTrain = (trainData) => 
    axios.post(`${API_URL}/trains`, trainData);

export const deleteTrain = (id) => 
    axios.delete(`${API_URL}/trains/${id}`);

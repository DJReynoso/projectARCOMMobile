import axios from 'axios';

// Android Emulator: 10.0.2.2 points to localhost
// Real device: replace with your computer's IP
const BASE_URL = 'http://10.0.2.2:5001';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

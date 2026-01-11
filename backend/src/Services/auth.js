import { api } from './api';

// Register
export const registerUser = async (
  first_name,
  last_name,
  name,
  email,
  password,
) => {
  const res = await api.post('/api/auth/register', {
    first_name,
    last_name,
    name,
    email,
    password,
  });
  return res.data;
};

// Login
export const loginUser = async (name, password) => {
  const res = await api.post('/api/auth/login', { name, password });
  return res.data;
};

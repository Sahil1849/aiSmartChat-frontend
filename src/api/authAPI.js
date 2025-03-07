// src/api/auth.api.js
import axios from '../config/axios.config';

export const loginUser = async (loginData) => {
    const response = await axios.post('/user/login', loginData);
    return response.data;
};

// Register a new user
export const registerUser = async (registerData) => {
    const response = await axios.post("/user/register", registerData);
    return response.data;
};

// Log out the user
export const logOutUser = async () => {
    const response = await axios.post("/user/logout");
    return response.data;
}

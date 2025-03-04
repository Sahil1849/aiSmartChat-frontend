// src/api/auth.api.js
import axios from '../config/axios.config';

export const loginUser = async (loginData) => {
    console.log(loginData);
    const response = await axios.post('/user/login', loginData);
    return response.data;
};

// Register a new user
export const registerUser = async (registerData) => {
    const response = await axios.post("/user/register", registerData);
    return response.data;
};

// Log out the user
export const logOutUser = async ()=>{
    console.log("In logOutUser");
    const response = await axios.post("/user/logout");
    console.log("response data: ",response.data);
    return response.data;
}

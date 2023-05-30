import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const instance = axios.create({
  baseURL: process.env.API_URL,
  headers: {'x-api-key': process.env.API_KEY},
  validateStatus: function (status) {
    return status < 500; 
  },
});
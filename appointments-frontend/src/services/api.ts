import axios from 'axios';

const VITE_API_BASE_URL = 'http://localhost:3000' // import.meta.env.VITE_API_BASE_URL;

export const fetchAppointments = async (): Promise<any[]> => {
    const response = await axios.get(`${VITE_API_BASE_URL}/appointments`);
    return response.data;
};
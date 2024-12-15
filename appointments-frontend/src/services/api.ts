import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your backend URL
type AppointmentStatus = 'Scheduled'| 'Completed'| 'Cancelled';
export interface Appointment {
    id: number;
    appointmentDate: string;
    status: AppointmentStatus;
    reason: string;
}

export const fetchAppointments = async (): Promise<Appointment[]> => {
    const response = await axios.get(`${API_BASE_URL}/appointments`);
    console.log(response);
    return response.data;
};
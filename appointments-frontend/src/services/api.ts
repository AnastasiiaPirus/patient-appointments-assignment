import axios from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAppointments = async (): Promise<any[]> => {
    const response = await axios.get(`${VITE_API_BASE_URL}/appointments`);
    console.log(response);
    return response.data;
};

export const fetchClinicians = async (): Promise<any[]> => {
    const response = await axios.get(`${VITE_API_BASE_URL}/clinicians`);
    console.log("clinicians", response);
    return response.data;
}

export const addClinician = async (npiNumber: any): Promise<any> => {
    const clinician = await getClinician(npiNumber);
    const response = await axios.post(`${VITE_API_BASE_URL}/clinicians`, {...clinician, npiNumber});
    if (response.status === 201) {
        return response.data;
    } else {
        throw new Error('Failed to add clinician');
    }
}

export const getClinician = async (npiNumber: any): Promise<any> => {
    const clinician = await axios.get(`${VITE_API_BASE_URL}/clinicians/getClinician/${npiNumber}`);
    console.log(clinician)
    return clinician.data;
}


export const addPatient = async (patient: any): Promise<any> => {
    const response = await axios.post(`${VITE_API_BASE_URL}/patients`, patient);
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error('Failed to add patient');
    }
}

export const fetchPatients = async (): Promise<any> => {
    const response = await axios.get(`${VITE_API_BASE_URL}/patients`);
    console.log("patients", response);
    return response.data;
}

export const addAppointment = async (appointment: any): Promise<any> => {
    const response = await axios.post(`${VITE_API_BASE_URL}/appointments`, appointment);
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error('Failed to add appointment');
    }
}
import {useEffect, useState} from 'react';
import {fetchAppointments, } from '../services/api';
import AppointmentList from '../components/AppointmentList';
import TimeFilter from '../components/TimeFilter';

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const getAppointments = async () => {
            const data = await fetchAppointments();
            setAppointments(data);
            setFilteredAppointments(data);
        };
        getAppointments();
    }, []);

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate).getTime();
            const end = new Date(endDate).getTime();
            setFilteredAppointments(
                appointments.filter((appointment) => {
                    const time = new Date(appointment.appointmentDate).getTime();
                    return time >= start && time <= end;
                })
            );
        } else {
            setFilteredAppointments(appointments);
        }
    }, [startDate, endDate, appointments]);


    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Appointments</h1>
            <TimeFilter
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
            <AppointmentList appointments={filteredAppointments}/>
        </div>
    );
};

export default AppointmentsPage;

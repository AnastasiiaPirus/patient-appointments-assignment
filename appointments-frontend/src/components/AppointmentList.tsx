import {Appointment} from '../services/api';

interface AppointmentListProps {
    appointments: Appointment[];
}

const AppointmentList = ({appointments}:AppointmentListProps) => {
    return (
        <div className="flex flex-col gap-4">
            {appointments.map((appointment) => (
                <div
                    key={appointment.id}
                    className="p-4 border rounded-md shadow-sm bg-gray-50"
                >
                    <p><strong>Patient:</strong> {appointment.patientName}</p>
                    <p><strong>Time:</strong> {new Date(appointment.appointmentTime).toLocaleString()}</p>
                    <p><strong>Status:</strong> {appointment.status}</p>
                </div>
            ))}
        </div>
    );
};

export default AppointmentList;

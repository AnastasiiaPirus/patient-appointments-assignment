interface AppointmentListProps {
    appointments: any[];
}

const AppointmentList = ({appointments}: AppointmentListProps) => {
    return (
        <div className="flex flex-col gap-4">
            {appointments.map((appointment) => (
                <div
                    key={appointment.id}
                    className="p-4 border rounded-md shadow-sm bg-gray-50"
                >
                    <p><strong>Patient:</strong> {appointment.Patient.firstName} {appointment.Patient.lastName}</p>
                    <p><strong>Clinician:</strong> {appointment.Clinician.firstName} {appointment.Clinician.lastName}
                    </p>
                    <p><strong>Reason:</strong> {appointment.reason}</p>
                    <p><strong>Time:</strong> {new Date(appointment.appointmentDate).toLocaleString("US")}</p>
                    <p><strong>Status:</strong> {appointment.status}</p>
                </div>
            ))}
        </div>
    );
};

export default AppointmentList;

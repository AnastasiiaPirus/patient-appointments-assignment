import {addAppointment, addClinician, addPatient, fetchClinicians, fetchPatients} from "../services/api";
import {useEffect, useState} from "react";

function AdminPage() {
    const [clinicians, setClinicians] = useState([]);
    const [patients, setPatients] = useState([]);

    function onAddClinician(event: React.FormEvent) {
        event.preventDefault();
        const npi = (event.target as HTMLFormElement).npi.value;
        addClinician(npi);
    }

    function onAddPatient(event: React.FormEvent) {
        event.preventDefault();
        const firstName = (event.target as HTMLFormElement).firstName.value;
        const lastName = (event.target as HTMLFormElement).lastName.value;
        const email = (event.target as HTMLFormElement).email.value;
        const phoneNumber = (event.target as HTMLFormElement).phoneNumber.value;
        const dateOfBirth = (event.target as HTMLFormElement).dateOfBirth.value;
        addPatient({firstName, lastName, email, phoneNumber, dateOfBirth});
    }

    function onAddAppointment(event: React.FormEvent) {
        event.preventDefault();
        const clinicianId = (event.target as HTMLFormElement).clinicianId.value;
        const patientId = (event.target as HTMLFormElement).patientId.value;
        const appointmentDate = (event.target as HTMLFormElement).appointmentDate.value;
        const reason = (event.target as HTMLFormElement).reason.value;
        addAppointment({clinicianId, patientId, appointmentDate, reason});
    }

    useEffect(() => {
        fetchClinicians().then((data) => setClinicians(data));
        fetchPatients().then((data) => setPatients(data));
    }, []);

    return (
        <div>
            {/*Create new Clinician*/}
            <form className="flex gap-2 mb-4" onSubmit={onAddClinician}>
                <input type="text" placeholder="Enter 10-digit NPI" pattern="\d{10}" name="npi" id="npi"
                       className="border border-gray-300 p-2 rounded-lg"/>
                <input type="submit" value="Add Clinician" className="bg-blue-500 text-white p-2 rounded-lg"/>
            </form>

            {/*Create new Patient*/}
            <form className="flex gap-2 mb-4" onSubmit={onAddPatient}>
                <input type="text" placeholder="First Name" name="firstName" id="firstName"
                       className="border border-gray-300 p-2 rounded-lg"/>
                <input type="text" placeholder="Last Name" name="lastName" id="lastName"
                       className="border border-gray-300 p-2 rounded-lg"/>
                <input type="text" placeholder="Email" name="email" id="email"
                       className="border border-gray-300 p-2 rounded-lg"/>
                <input type="text" placeholder="Phone" name="phoneNumber" id="phoneNumber"
                       className="border border-gray-300 p-2 rounded-lg"/>
                <input placeholder="Date of Birth" name="dateOfBirth" id="dateOfBirth" type="date"
                       className="border border-gray-300 p-2 rounded-lg"/>
                <input type="submit" value="Add Patient" className="bg-blue-500 text-white p-2 rounded-lg"/>
            </form>

            {/*Create new Appointment*/}
            <form className="flex gap-2 mb-4" onSubmit={onAddAppointment}>
                <select name="clinicianId" id="clinicianId" className="border border-gray-300 p-2 rounded-lg">
                    {clinicians.map((clinician: any) => (
                        <option key={clinician.id}
                                value={clinician.id}>{clinician.firstName} {clinician.lastName}</option>
                    ))}
                </select>
                <select name="patientId" id="patientId" className="border border-gray-300 p-2 rounded-lg">
                    {patients.map((patient: any) => (
                        <option key={patient.id}
                                value={patient.id}>{patient.firstName} {patient.lastName}</option>
                    ))}
                </select>
                <input placeholder="Appointment Date" name="appointmentDate" id="appointmentDate" type="datetime-local"
                       className="border border-gray-300 p-2 rounded-lg"/>
                <input type="text" placeholder="Reason" name="reason" id="reason"
                       className="border border-gray-300 p-2 rounded-lg"
                />
                <input type="submit" value="Add Appointment" className="bg-blue-500 text-white p-2 rounded-lg"/>
            </form>
        </div>
    );
}

export default AdminPage;
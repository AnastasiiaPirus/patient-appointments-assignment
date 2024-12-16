import {Clock, Cross, Doctor, Patient, Status} from "./Icons";

const AppointmentList = ({appointments}: any) => {
    return (

        <div className="space-y-4 max-w-2xl">
            {appointments.map((appointment) => (
                <div
                    key={appointment.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                    <div className="p-4 grid grid-cols-12 gap-4 items-center">
                        {/* Patient Section */}
                        <div className="col-span-12 md:col-span-6 flex items-center space-x-3">
                            <div
                                className="w-8 h-8 p-1 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
                                <Patient/>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">
                                    {appointment.Patient.firstName} {appointment.Patient.lastName}
                                </p>
                                <p className="text-sm text-gray-500">Patient</p>
                            </div>
                        </div>

                        {/* Clinician Section */}
                        <div className="col-span-12 md:col-span-6 flex items-center space-x-3">
                            <div
                                className="w-8 h-8 p-1 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
                                <Doctor/>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">
                                    {appointment.Clinician.firstName} {appointment.Clinician.lastName}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {appointment.Clinician.credential}
                                </p>
                            </div>
                        </div>

                        {/* Appointment Details */}
                        <div className="col-span-12 border-t pt-4 mt-2 grid grid-cols-2 gap-4">
                            {/* Reason */}
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 text-red-500">
                                    <Cross/>
                                </div>
                                <span className="text-sm text-gray-700">{appointment.reason}</span>
                            </div>

                            {/* Time */}
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 text-blue-500">
                                    <Clock/>
                                </div>
                                <span className="text-sm text-gray-700">
                  {new Date(appointment.appointmentDate).toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                  })}
                </span>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="col-span-12 mt-2">
                            <span
                                className='px-3 py-1 rounded-full text-xs font-medium flex items-center justify-center  bg-gray-100 text-gray-800'>
                                <div className="w-4 h-4 mr-2"><Status/></div>
                                {appointment.status}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AppointmentList;

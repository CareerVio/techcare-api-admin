export default {
    routes: [
      {
        method: 'GET',
        path: '/appointments/home/:searchCriteria', 
        handler: 'appointment.getAppointments',
      },
      {
        method: 'GET',
        path: '/appointments/doctors/:searchCriteria', 
        handler: 'appointment.getDoctors',
      },
      {
        method: 'GET',
        path: '/admin/appointments', 
        handler: 'appointment.getAppointmentsByMedicalFacility',
      },
    ]
}
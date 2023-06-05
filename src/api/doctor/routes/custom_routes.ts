export default {
    routes: [
      {
        method: 'GET',
        path: '/admin/doctors', 
        handler: 'doctor.getDoctorsByMedicalFacility',
      },
    ]
  }
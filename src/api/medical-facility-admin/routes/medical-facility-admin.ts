export default {
  routes: [
    {
      method: 'GET',
      path: '/medical-facility-admin/treatment-records',
      handler: 'medical-facility-admin.getTreatmentRecordsByMedicalFacility',
    },
    {
      method: 'GET',
      path: '/medical-facility-admin/doctors',
      handler: 'medical-facility-admin.getDoctorsByMedicalFacility',
    },
    {
      method: 'GET',
      path: '/medical-facility-admin/appointments',
      handler: 'medical-facility-admin.getAppointmentsByMedicalFacility',
    },
    {
      method: 'GET',
      path: '/medical-facility-admin/patients',
      handler: 'medical-facility-admin.getPatientsByMedicalFacility',
    },

    {
      method: 'GET',
      path: '/medical-facility-admin/treatment-records/:searchCriteria',
      handler: 'medical-facility-admin.getTreatmentRecordsByMedicalFacility',
    },
    {
      method: 'GET',
      path: '/medical-facility-admin/treatment-records/:user-id',
      handler: 'medical-facility-admin.getTreatmentRecordsByMedicalFacility',
    },
    {
      method: 'GET',
      path: '/medical-facility-admin/doctors/:searchCriteria',
      handler: 'medical-facility-admin.getDoctorsByMedicalFacility',
    },
    {
      method: 'GET',
      path: '/medical-facility-admin/appointments/:searchCriteria',
      handler: 'medical-facility-admin.getAppointmentsByMedicalFacility',
    },
    {
      method: 'GET',
      path: '/medical-facility-admin/patients/:searchCriteria',
      handler: 'medical-facility-admin.getPatientsByMedicalFacility',
    },

    {
      method: 'POST',
      path: '/medical-facility-admin/treatment-records',
      handler: 'medical-facility-admin.createTreatmentRecordByMedicalFacility',
    },
    {
      method: 'POST',
      path: '/medical-facility-admin/doctors',
      handler: 'medical-facility-admin.createDoctorByMedicalFacility',
    },
    {
      method: 'POST',
      path: '/medical-facility-admin/appointments',
      handler: 'medical-facility-admin.createAppointmentByMedicalFacility',
    },
  ],
};

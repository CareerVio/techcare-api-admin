export default {
    routes: [
      {
        method: 'GET',
        path: '/admin/treatment-records', 
        handler: 'treatment-record.getTreatmentRecordsByMedicalFacility',
      },
    ]
  }
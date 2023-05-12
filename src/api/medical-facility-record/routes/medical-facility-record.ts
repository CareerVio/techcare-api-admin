export default {
  routes: [
    {
      method: 'GET',
      path: '/medical-facility-record', 
      handler: 'medical-facility-record.getMedicalFacilities',
    },
    {
      method: 'GET',
      path: '/medical-facility-record/treatment-records/:medicalFacility_id', 
      handler: 'medical-facility-record.getTreatmentRecords',
    },
    {
      method: 'GET',
      path: '/medical-facility-record/treatment-record/:treatmentRecord_id', 
      handler: 'medical-facility-record.getTreatmentRecord',
    },
    {
      method: 'PUT',
      path: '/medical-facility-record/request-for-record/:treatmentRecord_id', 
      handler: 'medical-facility-record.updateRequestForRecord',
    },
    /*{
      method: 'GET',
      path: '/setting', 
      handler: 'setting.getSetting',
    },
    {
      method: 'PUT',
      path: '/setting', 
      handler: 'setting.updateSetting',
    },
    {
      method: 'GET',
      path: '/profile/:id', 
      handler: 'profile.getProfile',
    },
    {
      method: 'GET',
      path: '/profile', 
      handler: 'profile.getProfile',
    },
    {
      method: 'PUT',
      path: '/profile', 
      handler: 'profile.updateProfile',
    },*/
  ]
}
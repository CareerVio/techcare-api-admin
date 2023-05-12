export default {
    routes: [
      {
        method: 'GET',
        path: '/medical-facilities/:searchCriteria', 
        handler: 'medical-facility.getMedicalFacilitiesBySearch',
      },
      {
        method: 'GET',
        path: '/medical-facility/:searchCriteria', 
        handler: 'medical-facility.getMedicalFacilityByLocation',
      },
    ]
  }
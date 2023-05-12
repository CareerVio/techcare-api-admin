export default {
    routes: [
      {
        method: 'GET',
        path: '/emergencies/:fetchOption', 
        handler: 'emergency.find',
      },
      {
        method: 'GET',
        path: '/emergency/alert/:fetchOption', 
        handler: 'emergency.getEmergencyAlert',
      },
    ]
  }
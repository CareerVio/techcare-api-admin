export default {
    routes: [
      {
        method: 'GET',
        path: '/emergency/alert/:fetchOption', 
        handler: 'emergency.getEmergencyAlert',
      },
    ]
  }
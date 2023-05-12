export default {
    routes: [
      {
        method: 'GET',
        path: '/notifications/:fetchOption', 
        handler: 'notification.find',
      },
    ]
  }
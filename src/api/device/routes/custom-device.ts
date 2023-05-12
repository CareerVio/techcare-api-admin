export default {
    routes: [
      { // Path defined with an URL parameter
        method: 'POST',
        path: '/devices', 
        handler: 'device.createDevice',
      },
    ]
  }
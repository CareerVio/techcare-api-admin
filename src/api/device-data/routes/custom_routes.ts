export default {
    routes: [
      {
        method: 'GET',
        path: '/device-datas/:searchCriteria/:fetchOption', 
        handler: 'device-data.getDeviceDatas',
      },
      {
        method: 'GET',
        path: '/device-datas/:searchCriteria', 
        handler: 'device-data.getDeviceDatas',
      },
      {
        method: 'GET',
        path: '/device-datas', 
        handler: 'device-data.getDeviceDatas',
      },
      {
        method: 'GET',
        path: '/device-data', 
        handler: 'device-data.getDeviceData',
      },
      {
        method: 'GET',
        path: '/device-data/:userid', 
        handler: 'device-data.getDeviceData',
      },
      {
        method: 'GET',
        path: '/device-data/me', 
        handler: 'device-data.getMyDeviceData',
      },
      {
        method: 'GET',
        path: '/device-data/me/average',
        handler: 'device-data.getMyAverageDeviceData',
      }
    ]
  }
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
    ]
  }
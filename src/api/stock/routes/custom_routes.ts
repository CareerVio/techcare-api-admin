export default {
    routes: [
      {
        method: 'GET',
        path: '/stocks/:type', 
        handler: 'stock.find',
      },
      
    ]
  }
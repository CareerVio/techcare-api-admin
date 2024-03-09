export default {
    routes: [
        {
          method: 'GET',
          path: '/store/order/:id', 
          handler: 'store-order.getStoreOrder',
        },
        {
            method: 'GET',
            path: '/store/orders', 
            handler: 'store-order.getAllStoreOrders',
        },
        {
          method: 'PUT',
          path: '/store/order/:id', 
          handler: 'store-order.updateStoreOrder',
        },
        {
          method: 'POST',
          path: '/store/orders', 
          handler: 'store-order.createStoreOrder',
        },
      ]
}
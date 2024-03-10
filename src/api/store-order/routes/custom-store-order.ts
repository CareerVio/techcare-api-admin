export default {
    routes: [
        {
          method: 'GET',
          path: '/store/:store_id/order/:order_id', 
          handler: 'store-order.getStoreOrder',
        },
        {
            method: 'GET',
            path: '/store/:store_id/orders', 
            handler: 'store-order.getAllStoreOrders',
        },
        {
          method: 'PUT',
          path: '/store/:store_id/order/:order_id', 
          handler: 'store-order.updateStoreOrder',
        },
        {
          method: 'POST',
          path: '/store/:store_id/orders', 
          handler: 'store-order.createStoreOrder',
        },
      ]
}
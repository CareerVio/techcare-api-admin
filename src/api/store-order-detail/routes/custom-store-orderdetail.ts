export default {
    routes: [
        {
          method: 'GET',
          path: '/store/:store_id/order/:order_id/detail', 
          handler: 'store-order-detail.getStoreOrderDetail',
        },
        {
          method: 'PUT',
          path: '/store/:store_id/order/:order_id/detail', 
          handler: 'store-order-detail.updateStoreOrderDetail',
        },
      ]
}
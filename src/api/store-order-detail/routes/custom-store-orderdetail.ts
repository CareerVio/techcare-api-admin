export default {
    routes: [
        {
          method: 'GET',
          path: '/store/order/:id/detail', 
          handler: 'store-order-detail.getStoreOrderDetail',
        },
        {
          method: 'PUT',
          path: '/store/order/:id/detail', 
          handler: 'store-order-detail.updateStoreOrderDetail',
        },
      ]
}
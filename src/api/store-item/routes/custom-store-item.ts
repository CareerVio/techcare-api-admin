export default {
    routes: [
        {
          method: 'GET',
          path: '/store/:store_id/item/:item_id', 
          handler: 'store-item.getStoreItem',
        },
        {
            method: 'GET',
            path: '/store/:store_id/items', 
            handler: 'store-item.getAllStoreItems',
        },
        {
          method: 'PUT',
          path: '/store/:store_id/item/:item_id', 
          handler: 'store-item.updateStoreItem',
        },
        {
          method: 'POST',
          path: '/store/:store_id/items', 
          handler: 'store-item.createStoreItem',
        },
        {
          method: 'DELETE',
          path: '/store/:store_id/item/:item_id', 
          handler: 'store-item.deleteStoreItem',
        },
      ]
}
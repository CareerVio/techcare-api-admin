export default {
    routes: [
        {
          method: 'GET',
          path: '/store/item/:id', 
          handler: 'store-item.getStoreItem',
        },
        {
            method: 'GET',
            path: '/store/items', 
            handler: 'store-item.getAllStoreItems',
        },
        {
          method: 'PUT',
          path: '/store/item/:id', 
          handler: 'store-item.updateStoreItem',
        },
        {
          method: 'POST',
          path: '/store/items', 
          handler: 'store-item.createStoreItem',
        },
        {
          method: 'DELETE',
          path: '/store/item/:id', 
          handler: 'store-item.deleteStoreItem',
        },
      ]
}
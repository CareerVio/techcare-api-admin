export default {
    routes: [
        {
          method: 'GET',
          path: '/store/:id', 
          handler: 'store.getStore',
        },
        {
            method: 'GET',
            path: '/stores', 
            handler: 'store.getAllStores',
        },
        {
          method: 'PUT',
          path: '/store/:id', 
          handler: 'store.updateStore',
        },
        {
          method: 'POST',
          path: '/stores', 
          handler: 'store.createStore',
        },
        {
          method: 'DELETE',
          path: '/store/:id', 
          handler: 'store.deleteStore',
        },
      ]
}
export default {
    routes: [
        {
          method: 'GET',
          path: '/store/:id/files', 
          handler: 'store-file.getStoreFiles',
        },
        {
          method: 'PUT',
          path: '/store/:id/files/:id', 
          handler: 'store-file.updateStoreFiles',
        },
        {
          method: 'POST',
          path: '/store/:id/files', 
          handler: 'store-file.createStoreFiles',
        },
        {
          method: 'DELETE',
          path: '/store/:id/files/:id', 
          handler: 'store-file.deleteStoreFiles',
        },
      ]
}
export default {
    routes: [
        {
          method: 'GET',
          path: '/store/:store_id/files', 
          handler: 'store-file.getStoreFiles',
        },
        {
          method: 'PUT',
          path: '/store/:store_id/files/:file_id', 
          handler: 'store-file.updateStoreFiles',
        },
        {
          method: 'POST',
          path: '/store/:store_id/files', 
          handler: 'store-file.createStoreFiles',
        },
        {
          method: 'DELETE',
          path: '/store/:store_id/files/:file_id', 
          handler: 'store-file.deleteStoreFiles',
        },
      ]
}
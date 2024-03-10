export default {
    routes: [
        {
          method: 'GET',
          path: '/store/:store_id/category/:category_id', 
          handler: 'store-item-categorie.getCategory',
        },
        {
            method: 'GET',
            path: '/store/:store_id/categories', 
            handler: 'store-item-categorie.getAllCategory',
        },
        {
          method: 'PUT',
          path: '/store/:store_id/category/:category_id', 
          handler: 'store-item-categorie.updateCategory',
        },
        {
          method: 'POST',
          path: '/store/:store_id/categories', 
          handler: 'store-item-categorie.createCategory',
        },
        {
          method: 'DELETE',
          path: '/store/:store_id/category/:category_id', 
          handler: 'store-item-categorie.deleteCategory',
        },

        //item category
        {
            method: 'GET',
            path: '/store/:store_id/category/:category_id/items', 
            handler: 'store-item-categorie.getAllItemCategory',
          },
          {
            method: 'GET',
            path: '/store/:store_id/category/:category_id/item/:item_id', 
            handler: 'store-item-categorie.getOneItemCategory',
          },
          {
            method: 'PUT',
            path: '/store/:store_id/category/:category_id/item/:item_id', 
            handler: 'store-item-categorie.updateItemCategory',
          },
          {
            method: 'POST',
            path: '/store/:store_id/category/:category_id/items', 
            handler: 'store-item-categorie.createItemCategory',
          },
          {
            method: 'DELETE',
            path: '/store/:store_id/category/:category_id/item/:item_id', 
            handler: 'store-item-categorie.deleteItemCategory',
          },
    ]
}
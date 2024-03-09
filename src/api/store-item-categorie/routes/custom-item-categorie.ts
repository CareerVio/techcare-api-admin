export default {
    routes: [
        {
          method: 'GET',
          path: '/store/category/:id', 
          handler: 'store-item-categorie.getCategory',
        },
        {
            method: 'GET',
            path: '/store/categories', 
            handler: 'store-item-categorie.getAllCategory',
        },
        {
          method: 'PUT',
          path: '/store/category/:id', 
          handler: 'store-item-categorie.updateCategory',
        },
        {
          method: 'POST',
          path: '/store/categories', 
          handler: 'store-item-categorie.createCategory',
        },
        {
          method: 'DELETE',
          path: '/store/category/:id', 
          handler: 'store-item-categorie.deleteCategory',
        },

        //item category
        {
            method: 'GET',
            path: '/store/category/:category_id/items', 
            handler: 'store-item-categorie.getItemCategory',
          },
          {
            method: 'GET',
            path: '/store/category/:category_id/item/:item_id', 
            handler: 'store-item-categorie.getOneItemCategory',
          },
          {
            method: 'PUT',
            path: '/store/category/:category_id/item/:item_id', 
            handler: 'store-item-categorie.updateItemCategory',
          },
          {
            method: 'POST',
            path: '/store/category/:category_id/items', 
            handler: 'store-item-categorie.createItemCategory',
          },
          {
            method: 'DELETE',
            path: '/store/category/:category_id/item/:item_id', 
            handler: 'store-item-categorie.deleteItemCategory',
          },
    ]
}
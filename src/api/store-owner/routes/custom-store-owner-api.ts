export default {
    routes: [
        {
          method: 'POST',
          path: '/auth/pharmacy-register', 
          handler: 'store-owner.registerStoreOwner',
        },
        {
          method: 'POST',
          path: '/auth/pharmacy-login', 
          handler: 'store-owner.loginStoreOwner',
        },
      ]
}
const routesConfig = {
    routes: [
      {
        method: 'POST',
        path: '/auth/rider-register',
        handler: 'auth.registerRider',
        config: {
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/auth/rider-login',
        handler: 'auth.riderLogin',
        config: {
          policies: [],
        },
      },
    ],
  };
  
  export default routesConfig;
  
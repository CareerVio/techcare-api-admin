export default {
    routes: [
      {
        method: 'PUT',
        path: '/pdpa', 
        handler: 'pdpa.update',
      },
      {
        method: 'GET',
        path: '/setting', 
        handler: 'setting.getSetting',
      },
      {
        method: 'PUT',
        path: '/setting', 
        handler: 'setting.updateSetting',
      },
      {
        method: 'GET',
        path: '/profile/:id', 
        handler: 'profile.getProfile',
      },
      {
        method: 'GET',
        path: '/profile', 
        handler: 'profile.getProfile',
      },
      {
        method: 'PUT',
        path: '/profile', 
        handler: 'profile.updateProfile',
      },
    ]
  }
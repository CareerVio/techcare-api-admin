// This is the routes configuration for the rider-custom-api.
const routesConfig = {
    "routes": [
      {
        "method": "POST",
        "path": "/auth/register-rider",
        "handler": "Auth.registerRider",
        "config": {
          "policies": []
        }
      },
      {
        "method": "POST",
        "path": "/auth/rider-login",
        "handler": "Auth.login",
        "config": {
          "policies": []
        }
      }
    ]
}

export default routesConfig;
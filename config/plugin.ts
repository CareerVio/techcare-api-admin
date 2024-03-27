export default ({ env }) => ({
  // ...
  'strapi-plugin-fcm': {
    enabled: true,
    resolve: './src/plugins/strapi-plugin-fcm' // path to plugin folder
  },
  'chartbrew': true
  // ...
})
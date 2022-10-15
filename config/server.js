module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url:'https://93b8-2001-fb1-ea-609-f9e3-33e1-7c53-db98.ap.ngrok.io',
  app: {
    keys: env.array('APP_KEYS'),
  },
});

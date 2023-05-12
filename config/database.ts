export default ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'stickback'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'ooaakk00'),
      ssl: env.bool('DATABASE_SSL',false),
      charset: env('DATABASE_CHARSET', 'utf8mb4'),
    },
  },
});

module.exports = ({ env }) => ({
  connection: {
    client: "mysql",
    connection: {
      host: env("DATABASE_HOST", "172.94.32.34"),
      port: env.int("DATABASE_PORT", 3306),
      database: env("DATABASE_NAME", "strapi_db"),
      user: env("DATABASE_USERNAME", "admin"),
      password: env("DATABASE_PASSWORD", "Password123#@!"),
      ssl: env.bool("DATABASE_SSL", false),
    },
  },
});

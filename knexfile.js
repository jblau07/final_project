// Update with your config settings.

module.exports = {

  development: {
    development: {
      client: "pg",
      connection: {
        host: "localhost",
        user: config.db.user,
        password: config.db.password,
        database: config.db.database,
        charset: "utf8"
      },
      migrations: {
        directory: path.join(__dirname, "db/migrations")
      },
      seeds: {
        directory: path.join(__dirname, "db/seeds")
      },
      debug: false
    },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

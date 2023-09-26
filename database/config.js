// For more sequelize commands see https://github.com/sequelize/cli#usage
// & https://sequelize.org/v5/manual/migrations.html

require('dotenv/config');

module.exports = {
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  seederStorage: 'sequelize',
  migrationStorageTableName: 'sequelize_meta',
  seederStorageTableName: 'sequelize_data',
};

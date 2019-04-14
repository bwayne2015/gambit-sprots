const Sequelize = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize(config.const.database, config.const.dbUser, config.const.dbPassword, {
    host: config.const.dbHost,
    dialect: 'postgres',
    logging: false
});

//Connect to DB
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.wallets = require('./models/wallets')(sequelize, Sequelize);

module.exports = db;

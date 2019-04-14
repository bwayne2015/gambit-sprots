module.exports = (sequelize, DataTypes) => {
  const Wallets = sequelize.define('wallets', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      user_id:{
        type: DataTypes.INTEGER
      },
      has_deposited: {
        type: DataTypes.BOOLEAN
      },
      wallet_balance: {
        type: DataTypes.INTEGER
      },
      number_of_deposits: {
        type: DataTypes.INTEGER
      }
  });
  Wallets.sync();
  return Wallets;
};
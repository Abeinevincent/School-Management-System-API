module.exports = (sequelize, DataTypes) => {
  const AccountType = sequelize.define("AccountType", {
    accountType: {
      type: DataTypes.STRING,
    },

    accountId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return AccountType;
};

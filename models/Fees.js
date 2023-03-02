module.exports = (sequelize, DataTypes) => {
  const Fees = sequelize.define("Fees", {
    class: {
      type: DataTypes.STRING,
    },

    paymentReference: {
      type: DataTypes.STRING,
    },

    studentName: {
      type: DataTypes.STRING,
    },

    accountType: {
      type: DataTypes.STRING,
    },

    amount: {
      type: DataTypes.STRING,
    },

    accountNumber: {
      type: DataTypes.STRING,
    },

    accountId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Fees;
};

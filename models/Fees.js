module.exports = (sequelize, DataTypes) => {
  const Fees = sequelize.define("Fees", {
    class: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    termname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    paymentReference: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },

    studentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    accountType: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },

    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bankname: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },

    classFeesAMount: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    scheme: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    accountNumber: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },

    // ADDITIONAL FIELDS FOR MOMO USERS
    contact: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },

    transaction_reference: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },

    accountId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Fees;
};

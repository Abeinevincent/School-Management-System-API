module.exports = (sequelize, DataTypes) => {
  const Expenditures = sequelize.define("Expenditures", {
    itemname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    amount: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    expenditureId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Expenditures;
};

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
      unique: true,
    },

    amount: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    image: {
      type: DataTypes.STRING,
    },

    expenditureId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Expenditures;
};

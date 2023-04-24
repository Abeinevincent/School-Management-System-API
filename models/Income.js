module.exports = (sequelize, DataTypes) => {
  const Incomes = sequelize.define("Incomes", {
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

    incomeId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Incomes;
};

module.exports = (sequelize, DataTypes) => {
  const ClassFees = sequelize.define("ClassFees", {
    class: {
      type: DataTypes.STRING,
      required: true,
    },

    amount: {
      type: DataTypes.STRING,
    },

    classfeeId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return ClassFees;
};

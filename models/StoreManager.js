module.exports = (sequelize, DataTypes) => {
  const StoreManager = sequelize.define("StoreManager", {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    itemQuantity: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    takenBy: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    itemImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storeId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return StoreManager;
};

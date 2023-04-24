module.exports = (sequelize, DataTypes) => {
  const Departments = sequelize.define("Departments", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    image: {
      type: DataTypes.STRING,
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    subdeps: {
      type: DataTypes.JSON,
    },

    deptId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Departments;
};

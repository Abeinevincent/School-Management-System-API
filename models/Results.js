module.exports = (sequelize, DataTypes) => {
  const Results = sequelize.define("Results", {
    class: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    exam: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    firstname: {
      type: DataTypes.STRING,
    },

    lastname: {
      type: DataTypes.STRING,
    },

    attendence: {
      type: DataTypes.STRING,
    },

    marks: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },

    resultsId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });
  return Results;
};

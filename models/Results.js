module.exports = (sequelize, DataTypes) => {
  const Results = sequelize.define("Results", {
    class: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    term: {
      type: DataTypes.STRING,
    },

    exam: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
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
      defaultValue: [],
    },

    marks2: {
      type: DataTypes.JSON,
      defaultValue: [],
    },

    studentImage: {
      type: DataTypes.STRING,
    },

    resultsId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });
  return Results;
};

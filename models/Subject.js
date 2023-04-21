module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define("Subject", {
    subjectAbbrev: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    className: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },

    subjectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    subjectTeacher: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },

    subjectId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Subject;
};

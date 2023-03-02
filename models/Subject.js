module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define("Subject", {
    subjectAbbrev: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    className: {
      type: DataTypes.STRING,
    },

    subjectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    subjectTeacher: {
      type: DataTypes.STRING,
    },

    subjectId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Subject;
};

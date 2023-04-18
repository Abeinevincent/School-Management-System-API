module.exports = (sequelize, DataTypes) => {
  const Sylabus = sequelize.define("Sylabus", {
    className: {
      type: DataTypes.STRING,
    },

    subjectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    subjectFile: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },

    sylabusId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Sylabus;
};

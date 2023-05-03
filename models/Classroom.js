module.exports = (sequelize, DataTypes) => {
  const Classroom = sequelize.define("Classroom", {
    classNumeral: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    className: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    classTeacher: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },

    classroomId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Classroom;
};

module.exports = (sequelize, DataTypes) => {
  const Classroom = sequelize.define("Classroom", {
    classNumeral: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    className: {
      type: DataTypes.STRING,
    },

    classTeacher: {
      type: DataTypes.STRING,
    },

    classroomId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Classroom;
};

module.exports = (sequelize, DataTypes) => {
  const Marks = sequelize.define("Marks", {
    subjectTeacher: {
      type: DataTypes.STRING,
    },

    examName: {
      type: DataTypes.STRING,
    },

    subjectName: {
      type: DataTypes.STRING,
    },

    className: {
      type: DataTypes.STRING,
    },

    studentName: {
      type: DataTypes.STRING,
    },
    marks: {
      type: DataTypes.STRING,
    },

    marksId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Marks;
};

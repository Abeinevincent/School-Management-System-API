module.exports = (sequelize, DataTypes) => {
  const Exams = sequelize.define("Exams", {
    examDate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    examTimetable: {
      type: DataTypes.STRING,
    },

    runningTerm: {
      type: DataTypes.STRING,
    },

    examName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    examId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Exams;
};

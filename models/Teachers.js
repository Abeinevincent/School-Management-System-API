module.exports = (sequelize, DataTypes) => {
  const Teachers = sequelize.define("Teachers", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      max: 250,
    },

    email: {
      type: DataTypes.STRING,
    },

    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    stream: {
      type: DataTypes.STRING,
    },

    dateofbirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    class: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    educationlevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    maritalstatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    profileimage: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.STRING,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 100,
    },

    isTeacher: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    isClassTeacher: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    teacherId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });

  return Teachers;
};

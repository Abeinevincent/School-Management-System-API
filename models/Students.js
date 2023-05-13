module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define("Students", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      max: 250,
    },

    nin: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },

    parentEmail: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
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
      defaultValue: "N/A",
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    clas: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    stream: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },

    dateofbirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    parentname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    parentcontact: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    hostel: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },

    transport: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },

    profileimage: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 100,
    },

    attendence: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    isStudent: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    studentId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Students;
};

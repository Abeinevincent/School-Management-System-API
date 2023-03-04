module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define("Students", {
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
    },

    transport: {
      type: DataTypes.STRING,
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

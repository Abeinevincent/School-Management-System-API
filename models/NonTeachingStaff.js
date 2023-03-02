module.exports = (sequelize, DataTypes) => {
  const NonTeachingStaff = sequelize.define("NonTeachingStaff", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      max: 250,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
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

    rank: {
      type: DataTypes.STRING,
    },

    dateofbirth: {
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

    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    profileimage: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 100,
    },

    isNonteachingstaff: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    nonteachingstaffId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });

  return NonTeachingStaff;
};

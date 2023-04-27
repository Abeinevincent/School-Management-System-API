module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        max: 250,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        max: 100,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isTeacher: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isStudent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isNonTeachingStaff: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    }

    // {
    //   defaultScope: {
    //     attributes: {
    //       exclude: ["password"],
    //     },
    //   },
    // }
  );

  return Users;
};

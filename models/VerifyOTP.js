module.exports = (sequelize, DataTypes) => {
  const VerifyOTP = sequelize.define("VerifyOTP", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    verifyOTPId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });
  return VerifyOTP;
};

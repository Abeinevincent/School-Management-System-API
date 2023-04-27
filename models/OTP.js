module.exports = (sequelize, DataTypes) => {
  const OTP = sequelize.define("OTP", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    otpId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });
  return OTP;
};

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    title: {
      type: DataTypes.STRING,
    },

    userId: {
      type: DataTypes.STRING,
    },

    info: {
      type: DataTypes.STRING,
    },

    messageId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Message;
};

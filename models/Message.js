module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    title: {
      type: DataTypes.STRING,
    },

    receiverName: {
      type: DataTypes.STRING,
    },

    senderId: {
      type: DataTypes.STRING,
    },

    message: {
      type: DataTypes.STRING,
    },

    messageId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Message;
};

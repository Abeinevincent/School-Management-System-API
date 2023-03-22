module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define("Conversation", {
    conversationId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Conversation;
};

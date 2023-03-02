module.exports = (sequelize, DataTypes) => {
  const NoticeBoard = sequelize.define("NoticeBoard", {
    title: {
      type: DataTypes.STRING,
    },

    username: {
      type: DataTypes.STRING,
    },

    info: {
      type: DataTypes.STRING,
    },

    noticeId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return NoticeBoard;
};
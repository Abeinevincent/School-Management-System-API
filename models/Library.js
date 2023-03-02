module.exports = (sequelize, DataTypes) => {
  const Library = sequelize.define("Library", {
    class: {
      type: DataTypes.STRING,
    },

    subject: {
      type: DataTypes.STRING,
    },

    userId: {
      type: DataTypes.STRING,
    },

    bookName: {
      type: DataTypes.STRING,
    },

    bookAuthor: {
      type: DataTypes.STRING,
    },

    bookFile: {
      type: DataTypes.STRING,
    },

    libraryId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Library;
};

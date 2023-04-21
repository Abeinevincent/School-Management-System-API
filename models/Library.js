module.exports = (sequelize, DataTypes) => {
  const Library = sequelize.define("Library", {
    className: {
      type: DataTypes.STRING,
    },

    subjectName: {
      type: DataTypes.STRING,
    },

    userId: {
      type: DataTypes.STRING,
    },

    bookTitle: {
      type: DataTypes.STRING,
    },

    bookAuthor: {
      type: DataTypes.STRING,
      required: true,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "Available", // can also be lent
    },

    releasedAgainst: {
      type: DataTypes.STRING,
    },

    publication: {
      type: DataTypes.STRING,
    },

    libraryId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
  return Library;
};

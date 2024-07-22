module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define("Blog", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    context: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Blog.associate = (models) => {
    Blog.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };

  return Blog;
};

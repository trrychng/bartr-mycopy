'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    Category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 15]
      }
    },
    imgSource: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [4, 15]
      }
    }
  });

  Category.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Category.hasMany(models.Item, {
      onDelete: "cascade"
    });
  };


  return Category;
};
module.exports = function (sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      len: [1]
    },
    itemLocation: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1]
    },
    isSold: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    imgSource: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '/assets/img/item/defaultitem.png',
      len: [1]
    },
    selectOffer: {
      type: DataTypes.INTEGER,
      allowNull: true,
      len: [1]
    }





  });

  Item.associate = function (models) {

    Item.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Item.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });

    Item.hasMany(models.Offers, {
      onDelete: "cascade"
    })
  };

  return Item;
};

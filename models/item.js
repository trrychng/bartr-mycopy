module.exports = function(sequelize, DataTypes) {
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
        type: DataTypes.DECIMAL,
        allowNull: true,
        len: [1]
      }
      




    });
  
    Item.associate = function(models) {

      Item.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Item;
  };
  
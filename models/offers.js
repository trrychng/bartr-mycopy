module.exports = function (sequelize, DataTypes) {
  var Offers = sequelize.define("Offers", {
    userOffer: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      len: [1]
    }


  });

  Offers.associate = function (models) {

    Offers.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Offers.belongsTo(models.Item, {
      foreignKey: {
        allowNull: false
      }
    });

    // Offers.hasMany(models.User, {
    //     onDelete: "cascade"
    // })
  };

  return Offers;
};
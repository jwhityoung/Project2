module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {
      //   len: [1]
      // }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    placeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    //rating: DataTypes.TINYINT
  });

  // Review.associate = function(models) {
  //   Review.belongsTo(models.Place, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Review;
};

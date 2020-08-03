module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    placeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Review;
};

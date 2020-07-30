module.exports = function(sequelize, DataTypes) {
  var Place = sequelize.define("Place", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    //coordinates: DataTypes.GEOMETRY("POINT")
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  });

  // Place.associate = function(models) {
  //   Place.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Place;
};

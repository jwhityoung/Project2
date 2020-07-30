module.exports = function(sequelize, DataTypes) {
  var Place = sequelize.define("Place", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    coordinates: DataTypes.GEOMETRY("POINT")
  })

  Place.associate = function(models) {
    Place.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return Place;
}
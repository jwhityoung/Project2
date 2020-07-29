module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    rating: DataTypes.TINYINT
  })

  Review.associate = function(models) {
    Review.belongsTo(models.Place, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return Review
}
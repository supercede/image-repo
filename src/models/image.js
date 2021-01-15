const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  image.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      imageURL: DataTypes.STRING,
      description: DataTypes.STRING,
      tags: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('tags').split(';');
        },
        set(val) {
          this.setDataValue('tags', val.join(';'));
        },
      },
    },
    {
      sequelize,
      modelName: 'image',
      paranoid: true,
    },
  );
  return image;
};

const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.image, {
        foreignKey: {
          name: 'userId',
        },
      });
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'user',
    },
  );

  user.getExistinguser = async (queryString, column = 'email') => {
    const userData = await user.findOne({
      where: { [column]: queryString },
    });
    return userData;
  };

  user.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  user.beforeUpdate(async user => {
    if (user.changed('password')) {
      user.password = await user.generatePasswordHash();
      user.passwordLastChanged = Date.now();
    }
  });

  user.prototype.generatePasswordHash = async function generatePasswordHash() {
    const saltRounds = +process.env.SALT;
    return bcrypt.hash(this.password, saltRounds);
  };

  user.prototype.generateAccessToken = function () {
    return jwt.sign({ id: this.id }, secret, {
      expiresIn: '3d',
    });
  };

  user.prototype.toJSON = function () {
    const values = { ...this.get() };

    delete values.password;
    return values;
  };

  user.prototype.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return user;
};

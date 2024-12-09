import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../database/connection'

class Grocery extends Model {}

Grocery.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  },
  { sequelize, 
    modelName: "Grocery",
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
);

export default Grocery;

import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'
import sequelize from '../database/connection'

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  id!: string;
  userId!: string;
  totalAmount!: number;
}

class OrderItem extends Model<InferAttributes<OrderItem>, InferCreationAttributes<OrderItem>> {
  id!: string;
  orderId!: string;
  groceryId!: string;
  quantity!: number
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Order" }
);

OrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    groceryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "OrderItem" }
);

export { Order, OrderItem };

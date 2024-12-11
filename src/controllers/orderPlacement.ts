import { Request, Response } from "express";
import Grocery from "../models/Grocery";
import { Order, OrderItem } from "../models/Order";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
const { v4: uuidv4 } = require('uuid');

// Place Order
export const placeOrder:any = async (req: AuthenticatedRequest, res: Response) => {
  const { items } = req.body;
  let totalAmount = 0;

  try {
    const orderItems = await Promise.all(
      items.map(async (item: { groceryId: number; quantity: number }) => {
        const grocery:any = await Grocery.findByPk(item.groceryId);
        if (!grocery || grocery.stock < item.quantity) {
          throw new Error(`Item ${item.groceryId} is out of stock`);
        }

        totalAmount += grocery.price * item.quantity;
        grocery.stock -= item.quantity;
        await grocery.save();

        return { groceryId: item.groceryId, quantity: item.quantity };
      })
    );

    const order = await Order.create({ id:uuidv4(), userId: req.user.id, totalAmount });
    await OrderItem.bulkCreate(
      orderItems.map((item) => ({ ...item, orderId: order.id, id:uuidv4() }))
    );

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

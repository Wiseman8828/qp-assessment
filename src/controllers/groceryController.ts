import { Request, Response } from "express"
import Grocery from "../models/Grocery"
const { v4: uuidv4 } = require('uuid');




/**
 * It will add grocery to the database.
 * @param req 
 * @param res 
 */
export const addGrocery = async (req: Request, res: Response) => {
    const { name, price, stock } = req.body
    try {
        const grocery = await Grocery.create({ id: uuidv4(), name, price, stock  })
        res.status(201).json({ message: "Grocery added successfully", grocery })
    } catch (error:any) {
        console.log(`Error while adding the Grocery item, Message: ${error.message}, \nStack: ${error.stack}`)
        res.status(500).json({ error: "Failed to add grocery" })
    }
}



/**
 * To get the groceries from the database.
 * @param req 
 * @param res 
 */
export const getGroceries = async (req: Request, res: Response) => {
    try {
        const groceries = await Grocery.findAll();
        res.status(200).json(groceries);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch groceries" });
    }
};


/**
 * To update the existing groceries item.
 * @param req 
 * @param res 
 */
export const updateGrocery:any = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, stock } = req.body;

    try {
        const grocery:any = await Grocery.findByPk(id)
        if (!grocery) return res.status(404).json({ error: "Grocery not found" })

        grocery.name = name || grocery.name;
        grocery.price = price || grocery.price;
        grocery.stock = stock || grocery.stock;

        await grocery.save()
        res.status(200).json({ message: "Grocery updated successfully", grocery })
    } catch (error) {
        res.status(500).json({ error: "Failed to update grocery" })
    }
};
/**
 * To delete the existing groceries item.
 * @param req 
 * @param res 
 */
export const deleteGrocery:any = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await Grocery.destroy({ where: { id } })
        if (!result) return res.status(404).json({ error: "Grocery not found" })

        res.status(200).json({ message: "Grocery deleted successfully" })
    } catch (error) {
        res.status(500).json({ error: "Failed to delete grocery" })
    }
};

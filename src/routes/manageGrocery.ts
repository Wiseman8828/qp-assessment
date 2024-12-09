import { Router } from "express"
import { addGrocery, getGroceries, updateGrocery, deleteGrocery } from '../controllers/groceryController';

const router = Router();

router.post("/", addGrocery);
router.get("/", getGroceries);
router.put("/:id", updateGrocery);
router.delete("/:id", deleteGrocery);

export default router;

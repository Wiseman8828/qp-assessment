import { Router } from "express"
import { addGrocery, getGroceries, updateGrocery, deleteGrocery } from '../controllers/groceryController';
import { checkAdmin } from "../middleware/authenticateUser";
const router = Router();

router.post("/", checkAdmin, addGrocery);
router.get("/", getGroceries);
router.put("/:id", checkAdmin, updateGrocery);
router.delete("/:id", checkAdmin, deleteGrocery);

export default router;

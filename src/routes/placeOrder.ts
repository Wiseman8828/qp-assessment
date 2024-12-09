import { Router } from "express";
import { placeOrder } from '../controllers/orderPlacement';

const router = Router()
router.post("/", placeOrder)

export default router;
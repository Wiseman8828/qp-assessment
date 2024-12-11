import express, { Application, Request, Response } from "express"
import sequelize from './database/connection'
import manageGrocery from "./routes/manageGrocery";
import placeOrder from "./routes/placeOrder";
import authRoute from "./routes/authRoute";
import { authenticateUser } from "./middleware/authMiddleware";
import * as dotenv from 'dotenv';
dotenv.config();

const app: Application = express()


app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/auth", authRoute);
app.use("/grocery", authenticateUser, manageGrocery);
app.use("/order", authenticateUser, placeOrder);



(async () => {
  try {
    await sequelize.sync()
    await sequelize.authenticate()
    console.log("Database connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error("Failed to connect to the database:", error)
    process.exit(1)
  }
})();

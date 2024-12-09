import express, { Application, Request, Response } from "express"
import sequelize from './database/connection'
import manageGrocery from "./routes/manageGrocery";
import placeOrder from "./routes/placeOrder";

const app: Application = express()


app.use(express.json());
const PORT = process.env.PORT || 3000;


app.use("/grocery", manageGrocery);
app.use("/order", placeOrder);


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

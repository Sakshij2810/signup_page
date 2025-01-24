import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";

// routes import
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/database.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json({ extended: true, limit: "30mb" }));
app.use(cors({ origin: "http://localhost:5173" }));

//connect database
connectDB();

// routes middleware
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send(`Welcome to signup page`);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

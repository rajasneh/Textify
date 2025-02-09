import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import {connectDB} from "../lib/db.js"
import authRoutes from "../routes/auth.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
  connectDB();
});

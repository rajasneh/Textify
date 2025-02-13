import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connectDB} from "../lib/db.js"
import bodyParser from "body-parser";
import authRoutes from "../routes/auth.route.js";
import messageRoutes from "../routes/message.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;
app.use(bodyParser.json({ limit: '10mb' })); // Example for 10MB limit
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
  connectDB();
});

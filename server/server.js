import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoute from "./routes/auth.js"
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js"

import cors from "cors"



// configure env
dotenv.config();

//DB connect
connectDB();

// rest Object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

// PORT
const Port = process.env.PORT || 8000;

// run listen
app.listen(Port, () => {

    console.log(`server running on ${Port}`.bgCyan.white);
});
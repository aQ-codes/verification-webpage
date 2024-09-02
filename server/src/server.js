import userRoutes from "./routes/userRoutes.js";
import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { connect } from "./db/dbConfig.js";

const app = express();
const PORT = 8080;
dotenv.config();

app.use(cors());

// Middleware
app.use(express.json());

// Connect to MongoDB
connect();

app.get("/api/home", (req, res) =>{
    res.json({message: "Hello World!"});
})

// Routes
app.use("/api/users", userRoutes);

// Start the server
app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`)
})









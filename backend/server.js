import express from "express";
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import { connectDB } from "./config/db.js"

dotenv.config()


const app = express();

app.use(express.json())

//rest api 
app.use('/api/users', authRoutes)

const PORT = process.env.PORT || 5000;


connectDB();


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})


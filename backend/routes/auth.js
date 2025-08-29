import express from 'express';
import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "please fill all the fields" })
        }

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "User already Exists" })
        }

        const user = await User.create({ username, email, password })
        const token = generateToken(user._id)
        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token,
        })
    }
    catch (err) {
        console.error("Registration error:", err.message)
        res.status(500).json({ message: "internal server error" })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "please fill all the fields" })
        }

        const user = await User.findOne({ email })

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "invalid credentials" })
        }

        const token = generateToken(user._id)
        // Fixed: res.status(200).json (not res.json(200).json)
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token,
        })

    }
    catch (err) {
        console.error("Login error:", err.message)
        res.status(500).json({ message: "server error" })
    }
})

//me
router.get('/me', protect, async (req, res) => {
    res.status(200).json(req.user)
})

//Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

export default router;
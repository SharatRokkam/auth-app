import mongoose from "mongoose";
import bcrypt from 'bcryptjs' // Fixed: consistent bcrypt import

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next() // Fixed: add return

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt) // Fixed: use salt variable, not genSalt function
    next()
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema)

export default User
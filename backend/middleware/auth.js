export const protect = async (req, res, next) => {
    let token;

    // Fixed: req.headers (not req.header)
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Fixed: assign token variable
            token = req.headers.authorization.split(" ")[1]

            // Fixed: add decoded variable
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")

            return next()
        }
        catch (err) {
            console.error("Token verification failed", err.message)
            return res.status(401).json({ message: "Not authorized, token failed." })
        }
    }

    // Fixed: Add else block for missing token
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" })
    }
}
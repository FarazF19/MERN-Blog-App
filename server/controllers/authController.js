const User = require("../models/user.model");
const bcrypt = require("bcryptjs")

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    try {
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.json({
            message: "Signup Successfull"
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



module.exports = {
    signup
}
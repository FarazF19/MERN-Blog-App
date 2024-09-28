const User = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

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

const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required",
            success: false
        });
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return res.status(404).json({
                message: "User does not exist",
                success: false,

            });
        }

        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid Credentials!",
                success: false,
            });
        }
        const token = jwt.sign(
            { id: validUser._id }, process.env.JWT_SECRET,
        );

        const { password: pass, ...rest } = validUser._doc;

        res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest)

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const google = async (req, res) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = user._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    name.toLowerCase().split(' ').join('') +
                    Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign(
                { id: newUser._id, isAdmin: newUser.isAdmin },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = newUser._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        }
    } catch (error) {
        return res.error(error);
    }
};

module.exports = {
    signup,
    signin,
    google,
}
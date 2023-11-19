const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/user");

require("dotenv").config();

//signup route handler
exports.signup = async (req, res) => {
    try {
        //get data
        const { name, email, password, role } = req.body;

        //check if user already exist
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already Exists",
            });
        }

        //secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error inn hashing Password",
            });
        }

        //create entry for User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered, please try again later",
        });
    }
};

// login handler

exports.login = async (req, res) => {
    try {
        // data fetch
        const { email, password } = req.body;
        // validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Fill all Details Carefully Please",
            });
        }

        // check user is available or not

        let user = await User.findOne({ email });
        // if user not resgistereed with us
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not resistered with us Kindly resgister",
            });
        }


        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };
        // verify password and generate jwt token

        if (await bcrypt.compare(password, user.password)) {
            // Password Match
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h",

                });
            console.log(user);
            //  user.token = token;
            // user = user.toObject();
            user.token = token;
            console.log(user);
            user.password = undefined;
            console.log(user);
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,

            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "user Logged in Succesfully",

            })


            // res.status(200).json({
            //     success: true,
            //     token,
            //     user,
            //     message: "user Logged in Succesfully",

            // })

        }

        else {
            // password not matching here
            return res.status(403).json({
                success: false,
                message: 'Password incorrect',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Login Failure',
        })
    }
};

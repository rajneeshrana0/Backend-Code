const bcrypt = require("bcrypt");
const User = require("../models/User");



// Signup Route Handler

exports.signup = async (req, res) => {
    try {
        // get Data 
        const { name, email, role, password } = req.body;
        // check if user alredy exit
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User Already Exist',
            });

        }
        // secure password

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error in Hasing Password',
            });


        }
        // create user Entry

        const user = await User.create({
            name, email, password: hashedPassword, role
        })
        return res.status(200).json({
            success: true,
            message: 'User Created Succesfully',
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User Can not Be created, Please Try agin later',
        })
    }

}


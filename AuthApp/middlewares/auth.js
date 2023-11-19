// auth , isStudent ,isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        // extract jwt  token
        console.log("cookie", req.cookies.token);
        console.log("body", req.body.token);
        console.log("header", req.header("Authorization"));
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");
        if (!token || token === undefined) {
            res.status(401).json({
                success: false,
                message: "Token Missing ",
            })

        }

        // Verify the Token

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (error) {
            return response.status(401).json({
                success: false,
                message: "Token is Invalid",
            });
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something Went Wrong While Verifying Token",

        })
    }
}


// second Middle ware

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "this is a protected route for a student",
            });

        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Role is not Matching",

        });
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "this is a protected route for a Admin",
            });

        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Role is not Matching",

        });
    }

}
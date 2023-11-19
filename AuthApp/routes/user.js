const express = require("express");
const router = express.Router();

const { login, signup } = require("../Controllers/Auth");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");
const User = require("../models/User");
router.post("/login", login);
router.post("/signup", signup);


// Testing Single Protected Route for single middleware

router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: " This is our Testing Route",
    });
});


// Protected Routes

router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Student Dashboard",
    });
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Wecome to the Admin Dashboard",
    });
});

router.get("/getEmail", auth, async (req, res) => {

    try {
        const id = req.user.id;
        console.log("ID: ", id);
        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            user: user,
            message: "Welcome to the Email Route",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: "fatt gya code",
        })
    }
})
module.exports = router;
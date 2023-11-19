const express = require("express");
const router = express.Router();

// import Controler

const { createTodo } = require("../controllers/createTodo");
const { updateTodo } = require("../controllers/updateTodo");
const { getTodo,getTodoById} = require("../controllers/getTodo");
const { deleteTodo } = require("../controllers/deleteTodo");

// define API Routes

router.post("/createTodo", createTodo);
router.get("/getTodo", getTodo);
router.get("/getTodo/:id",getTodoById);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);

module.exports = router;
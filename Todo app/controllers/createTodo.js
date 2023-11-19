// import th model

const Todo = require("../models/Todo");

// define route handler

exports.createTodo = async (req, res) => {
    try {
        // extract title and descriptioon from body
        const { title, description } = req.body;
        // Create new Todo Object
        const response = await Todo.create({ title, description });
        //  Send a Json Response Qith a sucess Flag
        res.status(200).json(
            {
                success: true,
                data: response,
                message: 'Entry Created Successfully'
            }
        );
    } catch (err) {
      exports.createTodo = async (req, res) => {
    try {
        // extract title and descriptioon from body
        const { title, description } = req.body;
        // Create new Todo Object
        const response = await Todo.create({ title, description });
        //  Send a Json Response Qith a sucess Flag
        res.status(200).json(
            {
                success: true,
                data: response,
                message: 'Entry Created Successfully'
            }
        );
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500)
            .json({
                success: false,
                data: "internal server error",
                message: err.message,
            })
    }
};

    }
};

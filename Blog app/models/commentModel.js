// import mongoose
const mongoose = require("mongoose");

// routehandler

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post", // Refrence to the post model

    },
    user: {
        type: String,
        required: true,

    },
    body: {
        type: String,
        required: true,
    }
})

// export 

module.exports = mongoose.model("comment", commentSchema)
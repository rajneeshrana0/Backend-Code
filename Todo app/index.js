const express = require("express");
const app = express();

// load config from env file

require("dotenv").config();
const PORT = process.env.PORT || 4000;


// middle ware to parse json parse request body

app.use(express.json());


// import Route for TODDO API

const todoRoutes = require("./routes/todos");

// mount the todo API routes

app.use("/api/v1", todoRoutes);


// start server

app.listen(PORT,()=>{
    console.log(`Server Successfully  started at ${PORT}`);
})


// Connect Database 

const dbConnect = require("./config/database");
dbConnect();

// default Route

app.get("/", (req,res) =>{
res.send(`<h1> This is my Home Page</h1>`)

})
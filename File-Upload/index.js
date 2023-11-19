// create app

const express = require("express");
const app = express();

// port Find Out

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// add middle ware

app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

// connect db

const db = require("./config/database");
db.connect();

// connect to cloud

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// api route Mounting 

const upload = require("./routes/FileUpload");
app.use('/api/v1/upload',upload);

// activate server

app.listen(PORT,()=>{
    console.log(`App is Runnig at ${PORT}`);
})
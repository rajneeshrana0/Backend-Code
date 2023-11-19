const { Types } = require("mongoose");
const File = require("../models/File");
const { cloudinaryConnect } = require("../config/cloudinary");
const cloudinary = require("cloudinary").v2;

// Local File Upload handler System

exports.localFileUpload = async (req, res) => {
    try {


        // fetch file

        const file = req.files.file;
        console.log("File aa gyi hai", file);


        // Create Path to store file 

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path->", path);

        // add path to the move function

        file.mv(path, (error) => {
            console.log(error);
        });

        // Create Successfull Response

        res.json({
            success: true,
            message: "Local file uploaded Succesfully",
        })

    } catch (error) {
        console.log(error)
    }
}



function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);

}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    options.resource_type = "auto";

    if (quality) {
        options.quality = quality;

    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
// Image upload handler

exports.imageUpload = async (req, res) => {

    try {

        // data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;

        console.log(file);
        // validation

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();


        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File Format not Supported",
            });
        }

        // file format supported hai to

        const response = await uploadFileToCloudinary(file, "RajneeshRana");
        console.log(response);
        // db main entry save krni hai

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Uploaded Successfully"
        })



    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Something went Wrong',
        })
    }
}

//  Video Upload Handler

exports.videoUpload = async (req, res) => {
    try {
        // data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        // validation

        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        // Todo : add a upper limit of 5mb to upload a video
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File Format not Supported",
            });
        }

        // file format supported hai to
        console.log("Uploading to Online Folder Rajneesh Rana")
        const response = await uploadFileToCloudinary(file, "RajneeshRana");
        console.log(response);

        // db main entry save krni hai

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Video Uploaded Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Something went Wrong',
        })
    }
}

// imageReducerUpload handler

exports.imageReducerUpload = async (req, res) => {

    try {

        // data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;

        console.log(file);
        // validation

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();


        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File Format not Supported",
            });
        }

        // file format supported hai to

        const response = await uploadFileToCloudinary(file, "RajneeshRana", 30);
        console.log(response);
        // db main entry save krni hai

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Uploaded Successfully"
        })



    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Something went Wrong',
        })
    }
}
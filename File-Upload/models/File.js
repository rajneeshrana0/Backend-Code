const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const fileSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }

});

// post middleware

fileSchema.post("save", async function (doc) {
    try {
        console.log("Doc", doc);

        // create transporter using nodemailer

        let transporter = nodemailer.createTransport({
            host: process.env.Mail_HOST,
            auth: {
                user: process.env.Mail_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // send mail

        let info = await transporter.sendMail({
            from:`Rajneesh Rana`,
            to: doc.email,
            subject: "New file uploaded on cloudinary",
            html: `<h2>Welcome User </h2> <p>File Uploaded View Here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p> `,
        });
        console.log("info",info)
    } catch (error) {
        console.error(error);
    }
})

const File = mongoose.model("File", fileSchema);


module.exports = File;

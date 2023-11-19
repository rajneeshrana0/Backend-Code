const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {

        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => { console.log("Db Connected Succesfully") })
        .catch((err) => {
            console.log("DB Connection issues");
            console.error(err);
            process.exit(1);
        })
}
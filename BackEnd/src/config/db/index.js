const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config()

async function connect() {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
             useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true,
        });
        console.log("Connect successfully!");
    } catch (error) {
        console.log("Connect failure!");
    }
}

module.exports = { connect };
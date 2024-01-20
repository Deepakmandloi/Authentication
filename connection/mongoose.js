const mongoose = require("mongoose");
const mongoURI = process.env.mongoURI;
function connectMongoDB(){
    return mongoose.connect(mongoURI)
    .then(()=>{
        console.log("connected with mongodb");
    })
    .catch((error) =>{
        console.log("error with connecting ", error);
    });
}

module.exports = {connectMongoDB};
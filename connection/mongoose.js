const mongoose = require("mongoose");

function connectMongoDB(uri){
    return mongoose.connect(uri).then(()=>{
        console.log("connected with mongodb");
    })
    .catch((error) =>{
        console.log("error with connecting ", error);
    });
}

module.exports = {connectMongoDB};
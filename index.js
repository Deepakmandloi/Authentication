const express = require('express');
const port = process.env.PORT || 3000;
const app = express();



const {connectMongoDB} = require("./connection/mongoose");
connectMongoDB("mongodb://127.0.0.1:27017/Register-login");



app.get('/', (req, res) => {
    res.send("this is your default page");
});

app.listen(port, () =>{
    console.log(`server is listening on http://localhost:${port}`);
})
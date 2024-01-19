const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

// connection
const {connectMongoDB} = require("./connection/mongoose");
connectMongoDB("mongodb://localhost:27017/authentication");


//middlewares
app.use(express.json());

// routes
const registerRotute = require("./routes/Register");
app.use('/register', registerRotute);



app.get('/', (req, res) => {
    res.send("this is your default page");
});
app.listen(port, () =>{
    console.log(`server is listening on http://localhost:${port}`);
})
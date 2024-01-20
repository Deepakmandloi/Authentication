const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); 
const Users = require('../models/users');
const {body, validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.jwtSecretKey;
// const isAuth = require('../middleware/isAuth');


// middleware
const validEmail = () => body('email', "Enter valid email").isEmail();

router.post('/', validEmail(), async (req, res) => {
    const error = validationResult(req);
    try {
        if(!error.isEmpty()){
            return res.status(400).json(error.array());
        }
        const user = await Users.findOne({email : req.body.email});
        if(!user){
            return res.status(401).send("email is not registered");
        }
        const password = req.body.password;
        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.status(400).send("invalid password");
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const token = jwt.sign(data, jwtSecretKey);
        res.status(200).send(token);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})


module.exports = router;
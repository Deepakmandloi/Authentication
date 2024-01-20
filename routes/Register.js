const express = require('express');
const User = require('../models/users');
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.jwtSecretKey;
const {body, validationResult} = require("express-validator");

const nameValidator = () => body("name", "Enter a valid name").isLength({min : 3});
const emailValidator = () => body("email", "Enter a valid email").isEmail();

router.post('/', nameValidator(), emailValidator(), async (req, res) => {
    const {name, email, password} = req.body;
    const error = validationResult(req);
    // checking errors for middleware using validationResult inbuilt function of express validator
    if(!error.isEmpty()){
        return res.status(400).json({error : error.array()});
    }
    try{
        // encoding passward with hashing + salt;
        const hashedPassword = await bcrypt.hash(password, 10);
        // it will create user if email is unique otherwise it will throw error
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })
        // generating token based on id for better speed
        const data = {
            newUser:{
                id: newUser.id
            }
        }
        const authToken = jwt.sign(data, jwtSecretKey);
        // sending token as response
        res.json(authToken)
    }
    catch(error){
        res.status(500).send("some error occured");
    }
})
module.exports = router;


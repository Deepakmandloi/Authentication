const express = require('express');
const user = require('../models/users');
const router = express.Router();

router.post('/', async (req, res) => {
    const {name, email, passward} = req.body;
    const newUser = new user({name, email, passward});
    await newUser.save();
    res.status(200).send("user registered successfully");
})


module.exports = router;
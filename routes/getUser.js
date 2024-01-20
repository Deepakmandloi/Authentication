const express = require("express");
const router = express.Router();
const User = require('../models/users');
const isAuth = require('../middleware/isAuth');

router.get('/', isAuth, async (req, res)=>{
    const id = req.user.id;
    try {
        const user = await User.findById(id).select("-password");
        res.send(user);        
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
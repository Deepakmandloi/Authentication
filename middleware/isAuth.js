const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.jwtSecretKey;


const isAuth = (req, res, next)=> {
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({
            messege: "Please authenticate using valid token",
            success: false
        });
    }
    try {
        const payload = jwt.verify(token, jwtSecretKey);
        req.user = payload.user;
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports = isAuth;
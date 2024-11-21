const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
    console.log("verifyJwt");
    let token = req.cookies.chs;
    console.log(token)
    jwt.verify(token, String(process.env.SECRET), (err, decoded) => {
        if (err) return res.status(401).json({ message: "please login again" });
        console.log(decoded);
        req._id = decoded.id;
        req._type = decoded.type;
        next();
    });
};

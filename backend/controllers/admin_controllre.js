const Admin = require("../models/Admin");
const Movie =require("../models/Movies")
const jwt =require("jsonwebtoken");
const config = require('../config');
const jwtSecret = config.JWT_SECRET;

/* admin Login */
const adminLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim()) {
        return res.status(422).json({ error: "Invalid inputs" });
    }

    let admin;
    try {
        admin = await Admin.findOne({ email });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: "Internal server error" });
    }

    if (!admin) {
        return res
            .status(404)
            .json({ error: "Admin doesn't exist" });
    }

    const isPasswordCorrect = password === admin.password;
    if (!isPasswordCorrect) {
        return res
            .status(400)
            .json({ error: "Incorrect email or password" });
    }

    const token = jwt.sign({ id: admin._id }, jwtSecret, { expiresIn: "1d" });
    return res
        .status(200)
        .json({ message: "Login successful", token,id:admin.id });
};

  

  


module.exports = {
   adminLogin,
 
};
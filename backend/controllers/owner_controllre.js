const Owner = require("../models/Owner");
const User =require("../models/User")
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const config = require('../config');
const jwtSecret = config.JWT_SECRET;
/*theater Owner Registration*/ 
const ownerRegister = async (req, res, next) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(422).json({ error: "Invalid inputs" });
    }
    const newPassword = bcrypt.hashSync(password);
    try {
      const existingOwner = await Owner.findOne({ email });
      if (existingOwner) {
        return res.status(409).json({ message: "Owner already exists" });
      }
      const owner = new Owner({ name, email, password: newPassword, phone });
      await owner.save();
  
      return res.status(200).json({ message: "Registered successfully", owner });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Unexpected error occurred" });
    }
  };
  /*To get all user details*/
  const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        return next(error);
    }
    if (!users) {
        return res
            .status(500)
            .json({error: "Unexpected error occurred"});
    }
    return res
        .status(200)
        .json({users});
};
/*theater Owner Login*/ 
const ownerLogin = async (req,res,next)=>{
    const {email, password} = req.body;
    if (!email && email.trim() === "" || !password && password.trim() === "" ) {
        return res.status(422).json({ error: "Invalid inputs" });
    }
    let owner;
    try {
        owner = await Owner.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if (!owner) {
        return res
            .status(404)
            .json({error: "owner doesn't exist!!"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, owner.password);
    if (!isPasswordCorrect) {
        return res
            .status(400)
            .json({error: "email or password wrong"})
    }
    const token = jwt.sign({id:owner._id},jwtSecret,{expiresIn:"1d"})
    return res
        .status(200)
        .json({message: "Login successfull",token,id:owner._id});

}
module.exports ={
    ownerRegister,
    getUsers,
    ownerLogin

}
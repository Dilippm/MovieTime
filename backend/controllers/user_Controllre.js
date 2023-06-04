const User = require("../models/User");
const Booking = require("../models/Bookings")
const bcrypt = require("bcryptjs");
const config = require('../config');
const jwtSecret = config.JWT_SECRET;
const jwt = require('jsonwebtoken');

/* all user details*/
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
/*User signup*/
const userRegister = async (req, res, next) => {
    const {name, email, password, phone} = req.body;
    if (!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === "" && !phone && phone.trim() === "") {
        return res
            .status(422)
            .json({error:"invalid inputs"});
    }
    const newPassword = bcrypt.hashSync(password);
    let user;
    try {
        const existingUser = await User.findOne({ email }); // Check if user with the same email already exists
        if (existingUser) {
            return res.status(409).json({ error: "Owner already exists" });
          }
        user = new User({name, email, password: newPassword, phone});
        user = await user.save();

    } catch (error) {
        return console.log(error);
    }
    if (!user) {
        return res
            .status(500)
            .json({error:"unexpeted error occured"})
    }
    return res
        .status(200)
        .json({message: "Registered successfully", id:user._id});

}

/*user Login*/
const userLogin = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password || email.trim() === "" || password.trim() === "") {
        return res.status(422).json({error:"Invalid inputs"});
      }
      
    let user;
    try {
        user = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if (!user) {
        return res
            .status(404)
            .json({error: "user doesn't exist!!"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
        return res
            .status(400)
            .json({error: "email or password wrong"})
    }
    const token = jwt.sign({id:user._id},jwtSecret,{expiresIn:"1d"})
    return res
        .status(200)
        .json({message: "Login successfull",id: user._id,token});
}
/** user update */
const updateUser = async (req, res, next) => {
    const {id} = req.params;
    const {name, email, phone} = req.body;

    try {
        // Find the user by id
        let user = await User.findById(id);

        if (!user) {
            return res
                .status(404)
                .json({message: "User not found"});
        }

        // Update the user properties
        user.name = name;
        user.email = email;
        user.phone = phone;

        // Save the updated user
        user = await user.save();

        return res
            .status(200)
            .json({message: "Updated successfully", user});
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({message: "Something went wrong"});
    }
};
/**get user booking using userid */
const getBookingsofUser =async(req,res,next)=>{
    const id= req.params.id;
    let bookings;
    try {
        bookings=  await Booking.find({user:id})
    } catch (error) {
        return console.log(error);
    }
    if(!bookings){
        return res.status(500).json({message:"unable to find bookings "});

    }
    return res.status(200).json({bookings})
}
module.exports = {
    getUsers,
    userRegister,
    updateUser,
    userLogin,
    getBookingsofUser
};
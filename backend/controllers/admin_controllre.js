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

/** admin update */
const updateAdmin = async (req, res, next) => {
    const { id } = req.params;
    console.log("reqbody:",req.body);
    const { name, email, phone } = JSON.parse(req.body.admindata);
  
    try {
      // Find the user by id
      let admin = await Admin.findById(id);
  
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      // Update the user properties
      admin.name = name;
      admin.email = email;
      admin.phone = phone;
  
      // Check if a file was uploaded
      if (req.file) {
        // Generate a URL for the uploaded image
        const imageUrl = `http://localhost:5000/public/images/${req.file.filename}`;
        // Store the image URL in the user's profile
        admin.image = imageUrl;
      }
  
      // Save the updated user
      admin = await admin.save();
  
      return res.status(200).json({ message: "Updated successfully", admin });
    } catch (error) {
      console.log("on error");
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  /**Admin Get */
  const getAdmin= async(req,res,next)=>{
    const {id} = req.params;
    try {
        let admin = await Admin.findById(id);
        console.log("suer",admin);
        if (!admin) {
            return res
                .status(404)
                .json({message: "Admin not found"});
        }
        console.log("user:",admin);
        return res
        .status(200)
        .json({message: "user found successfully", admin});

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({message: "Something went wrong"});
        
    }
}

  


module.exports = {
   adminLogin,
   updateAdmin,
   getAdmin
 
};
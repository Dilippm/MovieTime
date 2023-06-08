const express = require("express");
const { uploadOptions } = require("../multer/multer");
const {adminLogin,getAdmin,updateAdmin,getUsers,updateuserStatus} = require("../controllers/admin_controllre")
const adminRoute = express.Router();

/*POST Routes*/
adminRoute.post('/login', adminLogin);
adminRoute.post('/:id',uploadOptions.single("image") ,updateAdmin)
adminRoute.post("/users/:id",updateuserStatus)
/**GET Routes */
adminRoute.get('/:id',getAdmin)
adminRoute.get("/users/:id",getUsers)

module.exports = adminRoute;
const express = require("express");
const { uploadOptions } = require("../multer/multer");
const {adminLogin,getAdmin,updateAdmin,getUsers} = require("../controllers/admin_controllre")
const adminRoute = express.Router();

/*POST Routes*/
adminRoute.post('/login', adminLogin);
adminRoute.post('/:id',uploadOptions.single("image") ,updateAdmin)
/**GET Routes */
adminRoute.get('/:id',getAdmin)
adminRoute.get("/users",getUsers)

module.exports = adminRoute;
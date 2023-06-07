const express = require("express");
const { uploadOptions } = require("../multer/multer");
const {adminLogin,getAdmin,updateAdmin} = require("../controllers/admin_controllre")
const adminRoute = express.Router();

/*POST Routes*/
adminRoute.post('/login', adminLogin);
adminRoute.post('/:id',uploadOptions.single("image") ,updateAdmin)
/**GET Routes */
adminRoute.get('/:id',getAdmin)

module.exports = adminRoute;
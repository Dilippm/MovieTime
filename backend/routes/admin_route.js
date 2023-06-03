const express = require("express");

const {adminLogin} = require("../controllers/admin_controllre")
const adminRoute = express.Router();

/*POST Routes*/
adminRoute.post('/login', adminLogin);

module.exports = adminRoute;
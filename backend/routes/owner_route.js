const express = require("express");
const { ownerRegister,
    getUsers,
    ownerLogin } = require("../controllers/owner_controllre");
const ownerRoute = express.Router();

/*POST Routes*/
ownerRoute.post('/register', ownerRegister)
ownerRoute.post('/login', ownerLogin)
/*PUT Routes*/
ownerRoute.put('/:id')
/*GET Routes*/
ownerRoute.get('/getusers', getUsers)

module.exports = ownerRoute;
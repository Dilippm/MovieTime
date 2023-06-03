const express = require("express");
const {getUsers, userRegister, updateUser, userLogin, getBookingsofUser} = require(
    "../controllers/user_Controllre"
);

const userRouter = express.Router();

/**GET ROUTES */

userRouter.get("/", getUsers);
userRouter.get("/booking/:id", getBookingsofUser);

/**POST ROUTES */

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)

/**PUT ROUTES */

userRouter.put('/:id', updateUser)

module.exports = userRouter;

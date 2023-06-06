const express = require("express");
const {getUsers, userRegister, updateUser, userLogin, getBookingsofUser,userGooleLogin,getUser} = require(
    "../controllers/user_Controllre"
);

const userRouter = express.Router();

/**GET ROUTES */

userRouter.get("/", getUsers);
userRouter.get("/booking/:id", getBookingsofUser);

/**POST ROUTES */

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
userRouter.post('/google_login', userGooleLogin)
userRouter.get('/:id',getUser)

/**PUT ROUTES */

userRouter.put('/:id', updateUser)

module.exports = userRouter;

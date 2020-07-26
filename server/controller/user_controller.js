const userLogic = require("../logic/user_logic")
const express = require("express")
const router = express.Router();
const config = require("../config.json")
const jwt = require('jsonwebtoken');
const mapUser = require("../middleware/map")


//login function
router.post("/login", async (request, response, next) => {
    let user = request.body;
    // After a successful login, add the following header to each request
    // Authorization: The word Bearer, space (" ") and then - the token.
    // Example : 
    // Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBdmkiLCJpYXQiOjE1ODU0OTAxMjd9.O01aQaKcEOHgRexVwwX53T_SqMmKBxP3ng2dlriackA
    const token = jwt.sign({ sub: user }, config.secret);

    try {
        let usersLoginResult = await userLogic.login(user)
        let loginResponse = {
            token: token,
            userType: usersLoginResult.user_type
          

        }
        response.json(loginResponse)
        //save user information in a map
        mapUser.saveUserInfo(token, usersLoginResult)
    }
    catch (error) {
        return next(error);
    }

})

//get all the users in the db- admin only
router.get("/", async (request, response, next) => {
    try {
        let users = await userLogic.getAllUsers();
        response.json(users);

    } catch (error) {
        return next(error);
    }
});

//register user
router.post("/register", async (request, response, next) => {
    let user = request.body;

    try {
        await userLogic.addUser(user)
        response.status(200).json("succesful register")

    } catch (error) {
        return next(error);
    }
})

//get a spacific user
router.get("/:id", async (request, response, next) => {
    let id = +request.params.id
    try {
        let user = await userLogic.getUser(id);
        response.json(user);

    } catch (error) {
        return next(error);
    }
});

//update user inpormation
router.put("/", async (request, response, next) => {
    let user = request.body;
    try {
        await userLogic.updateUser(user)
        response.status(200).json("updat succesful")

    } catch (error) {
        return next(error);
    }
})



//delete user from db- admin only
router.delete("/:id", async (request, response, next) => {
    let id = +request.params.id
    try {
        await userLogic.deleteUser(id);
        response.status(200).json("user was deleted");
    } catch (error) {
        return next(error);
    }
});

//update password
router.put("/updatePassword", async (request, response, next) => {
    let user = request.body;
    console.log(user)

    try {
        await userLogic.updatePassword(user)
        response.status(200).json("password was update")

    } catch (error) {
        return next(error);
    }
})

module.exports = router;
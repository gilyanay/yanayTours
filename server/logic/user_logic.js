const userDao = require("../dao/user_dao")
const User = require("../models/user")
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const crypro = require("crypto")

//login function- client + admin
async function login(user) {
    // hash the password
    let hashPassword = crypro.createHash('md5').update(user.password).digest("hex")
    user.password = hashPassword
    let usersLoginResult = await userDao.login(user)
    return usersLoginResult
}

//delete user from db- admin only
async function deleteUser(id) {
    let deleteResponce = await userDao.deleteUser(id)
    if (deleteResponce.affectedRows == 0) {
        throw new ServerError(ErrorType.NO_ROWS_WAS_DELETAD);
    }
}

//get all the users in the db- admin only
async function getAllUsers() {
    let users = await userDao.getAllUsers();
    if (users.length == 0) {
        throw new ServerError(ErrorType.NO_USERS_IN_DATABASE);
    }
    return users;
}

//get a spacific user
async function getUser(id) {
    let user = await userDao.getUser(id)
    if (user.length == 0) {
        throw new ServerError(ErrorType.NO_USER_IN_DATABASE);
    }
    return user
}

//register user
async function addUser(user) {
    console.log(user)
    //chacking if the user is in the db
    let isUserExistByName = await userDao.isUserExistByName(user.userName)
    if (isUserExistByName) {
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }
    validateUser(user)
    // hash the password
    let hashPassword = crypro.createHash('md5').update(user.password).digest("hex")
    user.password = hashPassword
    
    await userDao.addUser(user)
}

//update user inpormation
async function updateUser(user) {
    //chacking if the user is in the db
   
    let isUserExistByName = await userDao.isUserExistByName(user.userName)
    
    if (!isUserExistByName) {
        throw new ServerError(ErrorType.USER_NAME_DOES_NOT_EXIST);
    }

    validateUser(user)
   
    await userDao.updateUser(user)
}

//update password
async function updatePassword(user) {
    //chacking if the user is in the db
    let isUserExistByName = await userDao.isUserExistByName(user.userName)
    if (!isUserExistByName) {
        throw new ServerError(ErrorType.USER_NAME_DOES_NOT_EXIST);
    }
    // hash the password
    let hashPassword = crypro.createHash('md5').update(user.password).digest("hex")
    user.password = hashPassword
    await userDao.updatePassword(user)
}


// joi validation
function validateUser(user) {
    const errorDetails = User.validate(user);
    if (errorDetails) {
        throw new ServerError(ErrorType.INFORMATION_TYPE_IS_NOT_VALID);
    }

}


module.exports = {
    login,
    getAllUsers,
    getUser,
    updateUser,
    addUser,
    deleteUser,
    updatePassword

}
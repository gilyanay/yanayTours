const connection = require("./connection-wrapper")
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error")

//login function
async function login(user) {
    let sql = "SELECT * FROM users where user_name =? and password =?";
    let parameters = [user.userName, user.password];
    let usersLoginResult;
    //validate the user login result
    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);
 
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }
    if (usersLoginResult == null || usersLoginResult.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }
    return usersLoginResult[0];
}

//get all the users in the db- admin only
async function getAllUsers() {
    let sql = "SELECT * FROM users"
    let users = await connection.execute(sql);
    return users
}

//get a spacific user
async function getUser(id) {
    let sql = "SELECT * FROM users where id=?"
    let parameters = id
    let user = await connection.executeWithParameters(sql, parameters);
    return user
}

//register user
async function addUser(user) {
    let sql = "INSERT INTO users (user_name, first_name, last_name, password) VALUES (?,?,?,?)"
    let parameters = [user.userName, user.firstName, user.lastName, user.password];
    await connection.executeWithParameters(sql, parameters);
}

//update user inpormation
async function updateUser(user) {
    let sql = "update users set user_name=?, first_name=?, last_name=?, password=? WHERE id=?"
    let parameters = [user.userName, user.firstName, user.lastName, user.password, user.id];
    await connection.executeWithParameters(sql, parameters);

}

//update password
async function updatePassword(user) {
    let sql = "update users set  password=? WHERE user_name=?"
    let parameters = [user.password, user.userName];
    await connection.executeWithParameters(sql, parameters);
}

//delete user from db- admin only
async function deleteUser(id) {
    //delete user followed vacation
    let parameters = id
    let sql1 = "DELETE  FROM vacation_tracking where user_id=?"
    await connection.executeWithParameters(sql1, parameters);

    //delete the user from the db
    let sql = "DELETE  FROM users where id=?"
    let deleteResponce = await connection.executeWithParameters(sql, parameters);
    return deleteResponce
}

//chacking if the user exist in the db
async function isUserExistByName(userName) {
    let sql = "SELECT * FROM users where user_name=?"
    let parameters = userName
    let user = await connection.executeWithParameters(sql, parameters);

    if (user.length !== 0) {
        return true
    }
}



module.exports = {
    login,
    getAllUsers,
    getUser,
    updateUser,
    addUser,
    deleteUser,
    updatePassword,
    isUserExistByName
}
let mapArray = new Array()

//incharge of adding object to the array
function saveUserInfo(token, succesfolLoginDetails) {
    let userInformatiom = {
        
        key: token,
        value: succesfolLoginDetails
    }
    console.log(userInformatiom)
    mapArray.push(userInformatiom)
    return mapArray
}

//serching the map array for the token and getting the user id
function checkMapForUserId(token) {
    console.log("11")
    let userId;
    for (let index = 0; index < mapArray.length; index++) {
console.log("1")
console.log(token)
        if (token == "Bearer" + " " + mapArray[index].key) {
     console.log("2")
            userId = mapArray[index].value.id
        }
    }
    return userId
}

//serching the map array for the token and getting the user information
function getUserInfo(token) {
    let userInfo
    for (let index = 0; index < mapArray.length; index++) {

        if (token == "Bearer" + " " + mapArray[index].key) {
            userInfo = mapArray[index].value
        }
    }
    return userInfo
}

module.exports = { saveUserInfo, checkMapForUserId, getUserInfo }
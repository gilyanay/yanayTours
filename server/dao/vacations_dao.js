const connection = require("./connection-wrapper")


//get all the vacations
async function getAllVacations(){
    let sql= "select * from vacations"
    let vacations = await connection.execute(sql);
    return vacations
}

//get a spacific vaction
async function getVacation(id){
    let sql = "SELECT * FROM vacations where id=?"
    let parameters = id
    let vacation = await connection.executeWithParameters(sql, parameters);
    return vacation
}

//get all the chosen vacations of a spacific user
async function getAllUserVacations(userId){
let sql = "SELECT v.* , vt.user_id  from vacations v left JOIN vacation_tracking vt on v.id=vt.vacation_id where vt.user_id=? or vt.user_id is null order by user_id DESC,start_date"
let parameters = userId
let vacations = await connection.executeWithParameters(sql, parameters);
return vacations
}

//add a new vacation
async function addVacation(vacation){
let sql = "insert into vacations (description,destination,start_date,end_date,price) values (?,?,?,?,?)"
let parameters =[vacation.description,vacation.destination, vacation.startDate,vacation.endDate, vacation.price]
await connection.executeWithParameters(sql, parameters);

}

//add a new follow vacation
async function addVacationToUsersChoices(vacationToFollow){
let sql="insert into vacation_tracking (user_id,vacation_id) values (?,?)"
let parameters =[vacationToFollow.userId,vacationToFollow.vacationId]
await connection.executeWithParameters(sql, parameters);
}

//remove a vacation from user follow vacation
async function removeVactionFromUserChoices(vacationToUnFollow){
let sql = "delete from vacation_tracking where user_id=? and vacation_id=?"
let parameters =[vacationToUnFollow.userId,vacationToUnFollow.vacationId]
await connection.executeWithParameters(sql, parameters);
}

//update information on existing vacation
async function updateVaction(vacation){
let sql = "update vacations set description=? ,destination=? ,start_date=? , end_date=? , price=? where id=?"
let parameters =[vacation.description,vacation.destination, vacation.startDate,vacation.endDate, vacation.price,vacation.id]
await connection.executeWithParameters(sql, parameters);
}



//remove a vacation from db
async function deleteVaction(vactionId){
    //delete user followed vacation
    let parameters = vactionId
    let sql1 = "DELETE  FROM vacation_tracking where vacation_id=?"
    await connection.executeWithParameters(sql1, parameters);

    let sql="delete from vacations where id=?"
    await connection.executeWithParameters(sql, parameters);
}

//updating the image name in the db
async function updateImageVaction(){
    
}

module.exports={
    getAllVacations,
    getVacation,
    getAllUserVacations,
    addVacation,
    addVacationToUsersChoices,
    deleteVaction,
    updateVaction,
    removeVactionFromUserChoices
}

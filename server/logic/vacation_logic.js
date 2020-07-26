const vacationDao = require("../dao/vacations_dao")
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const Vacation = require("../models/vacation")

//get all the vacations
async function getAllVacations(){
   let vacations= await vacationDao.getAllVacations()
   if (vacations.length == 0) {
    throw new ServerError(ErrorType.NO_VACATIONS_IN_DATABASE);
}
   return vacations
}

//get a spacific vaction
async function getVacation(id){
    let vacation= await vacationDao.getVacation(id)
    if (vacation.length == 0) {
        throw new ServerError(ErrorType.VACATIONS_DOES_NOT_EXIST);
    }
    return vacation
}

//get all the tracked vacations of a spacific user
async function getAllUserVacations(userId){
    let vacations= await vacationDao.getAllUserVacations(userId)
    if (vacations.length == 0) {
     throw new ServerError(ErrorType.NO_VACATIONS_FOLLOWED_BY_USER);
 }
    return vacations
}

//add a new vacation to the db
async function addVacation(vacation){
    validateVaction(vacation)
    await vacationDao.addVacation(vacation)
}

//add a new  vacation to track
async function addVacationToUsersChoices(vacationToFollow){
    if(vacationToFollow.vacationId==null){
        throw new ServerError(ErrorType.NO_VACATIONS_WAS_SENT_TO_ADD);
    }
    await vacationDao.addVacationToUsersChoices(vacationToFollow)
}

//delete a vacation from the db
async function deleteVaction(vacationId){
    if(vacationId==null){
        throw new ServerError(ErrorType.NO_VACATIONS_WAS_SENT_TO_DELETE);
    }
await vacationDao.deleteVaction(vacationId)
}

//update information on existing vacation
async function updateVaction(vacation){
    validateVaction(vacation)
await vacationDao.updateVaction(vacation)
}

//remove a vacation from user follow vacation
async function removeVactionFromUserChoices(vacationToUnFollow){
    if(vacationToUnFollow.vacationId==null){
        throw new ServerError(ErrorType.NO_VACATIONS_WAS_SENT_TO_REMOVE);
    }
    await vacationDao.removeVactionFromUserChoices(vacationToUnFollow)
}

// joi validation
function validateVaction(vacation) {
    const errorDetails = Vacation.validate(vacation);
    if (errorDetails) {
        throw new ServerError(ErrorType.INFORMATION_TYPE_IS_NOT_VALID);
    }

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
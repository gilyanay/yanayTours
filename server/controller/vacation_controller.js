const vacationLogic = require("../logic/vacation_logic")
const express = require("express")
const router = express.Router();
const mapUser = require("../middleware/map")


//get all vacations
router.get("/", async (request, response, next) =>{
    try {
        let vacations = await vacationLogic.getAllVacations();
        response.json(vacations);

    } catch (error) {
        return next(error);
    }
})

//get all the tracked vacations of a spacific user
router.get("/vacationsByUser", async (request, response, next) =>{
    //extracting the token from the header request
    let token = request.headers.authorization

    //getting the user id from the map array
    let userId = mapUser.checkMapForUserId(token)

try {
    let userTrackingVacations = await vacationLogic.getAllUserVacations(userId);
    response.json(userTrackingVacations);

} catch (error) {
    return next(error);
}
})

//add a new  vacation to track
router.post("/addToTracking", async (request, response, next) =>{
    let vacationToFollow;
    let vacation=+request.body;


    //extracting the token from the header request
    let token = request.headers.authorization;

    let userId=mapUser.checkMapForUserId(token);
    //getting the user id from the map array
    //  vacationToFollow.userId=mapUser.checkMapForUserId(token);

     vacationToFollow.vacationId=vacation.id;
    try {
     await vacationLogic.addVacationToUsersChoices(vacationToFollow);
        response.status(200);

    } catch (error) {
        return next(error);
    }
})


//get a spacific vacations
router.get("/:id", async (request, response, next) =>{
    try {
        let vacation = await vacationLogic.getVacation();
        response.json(vacation);

    } catch (error) {
        return next(error);
    }
})



//add a new vacation to the db
router.post("/",async(request, response, next)=>{
    let vacation=request.body
    try {
     await vacationLogic.addVacation(vacation);
        response.status(200);

    } catch (error) {
        return next(error);
    }
})



//delete a vacation from the db
router.delete("/:id", async(request, response, next)=>{
    let id = +request.params.id
    try {
        await vacationLogic.deleteVaction(id);
        response.status(200)
    } catch (error) {
        return next(error);
    }
})

//update information on existing vacation
router.put("/", async(request, response, next)=>{
    let vacation=request.body;
    try {
        await vacationLogic.updateVaction(vacation);
        response.status(200)
    } catch (error) {
        return next(error);
    }
})


router.delete("/:id" , async(request, response, next)=>{
    let vacationToUnFollow;
    //extracting the token from the header request
    let token = request.headers.authorization;
    //getting the user id from the map array
     vacationToUnFollow.userId=mapUser.checkMapForUserId(token);
     vacationToFollow.vacationId=+request.params.id;
    try {
     await vacationLogic.addVacationToUsersChoices(vacationToUnFollow);
        response.status(200);

    } catch (error) {
        return next(error);
    }
} )



module.exports = router;
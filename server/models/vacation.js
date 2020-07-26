const Joi = require("joi");

class Vacation {
    constructor(description, destination, startDate, endDate,price) {
        this.description = description
        this.destination = destination
        this.startDate - startDate
        this.endDate = endDate
        this.price = price
    }

    static validate(vacationToValidate) {

        const validationSchema = {
            description: Joi.string().required(),
            destination: Joi.string().required(),
            startDate: Joi.string().required(),
            endDate: Joi.string().required(),
            price:Joi.string().required(),
            id: Joi.number().optional(),
        };

        const error = Joi.validate(
            vacationToValidate, validationSchema, { abortEarly: false }).error;



        if (error) { // אם היתה שגיאה אחת או יותר
            // החזרת הודעות השגיאה בלבד
            return error.details.map(err => err.message);
        }

        // אם לא היתה שגיאה
        return null;
    }
}

module.exports = Vacation;

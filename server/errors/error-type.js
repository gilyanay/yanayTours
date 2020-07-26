let ErrorType = {

    GENERAL_ERROR: { id: 1, httpCode: 600, message: "'A general error ....'", isShowStackTrace: true },
    USER_NAME_ALREADY_EXIST: { id: 2, httpCode: 601, message: "User name already exist", isShowStackTrace: false },
    UNAUTHORIZED: { id: 3, httpCode: 401, message: "Login failed, invalid user name or password", isShowStackTrace: false },
    USER_NAME_DOES_NOT_EXIST: { id: 4, httpCode: 602, message: "User name NOT exist", isShowStackTrace: false },
    NO_USERS_IN_DATABASE: { id: 5, httpCode: 603, message: "No users in db", isShowStackTrace: false },
    NO_ROWS_WAS_DELETAD: { id: 6, httpCode: 604, message: "delete failed", isShowStackTrace: false },
    NO_USER_IN_DATABASE: { id: 7, httpCode: 605, message: "user does not exict in db", isShowStackTrace: false },
    INFORMATION_TYPE_IS_NOT_VALID: { id: 8, httpCode: 606, message: "the data is not valid", isShowStackTrace: false },
    NO_VACATIONS_IN_DATABASE: {id:9 ,httpCode: 607, message: "No vacations in db", isShowStackTrace: false },
    VACATIONS_DOES_NOT_EXIST:{id:10 ,httpCode: 608, message: "vacations does not exist in db", isShowStackTrace: false},
    NO_VACATIONS_FOLLOWED_BY_USER:{id:11 ,httpCode: 609, message: "user dont have a vacation tracking", isShowStackTrace: false},
    NO_VACATIONS_WAS_SENT_TO_ADD: {id:12 ,httpCode: 610, message: "no vacation sent to add", isShowStackTrace: false},
    NO_VACATIONS_WAS_SENT_TO_DELETE: {id:13 ,httpCode: 611, message: "no vacation sent to delete", isShowStackTrace: false},
    NO_VACATIONS_WAS_SENT_TO_REMOVE: {id:14 ,httpCode: 612, message: "no vacation sent to remove", isShowStackTrace: false}
}

module.exports = ErrorType;
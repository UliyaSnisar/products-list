const ValidLengthOfUserName = {
    MIN_LENGTH_OF_NAME: 3,
    MAX_LENGTH_OF_NAME: 30,
  };

const HttpCode = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
}


module.exports = {
    HttpCode,
    ValidLengthOfUserName
}
exports.responseMessages = {
    EMAIL_ALREADY_REGISTERED: "This email is already registered with us. Try signing in.",
    EMAIL_NOT_REGISTERED: "This email is not registered with us.",
    EMAIL_NOT_VERIFIED: "This email is not verified. Please verify your email and try again.",
    EMAIL_ALREADY_VERIFIED: "This email has already been verified. Please continue logging in.",
    EMAIL_BLOCKED: "This email is blocked by admin.",
    INCORRECT_OLD_PASSWORD: "Incorrect old password.",
    INVALID_CREDENTIALS: "Invalid Credentials Provided.",
    PARAMETER_MISSING: "Parameter missing or parameter type is wrong.",
    SERVER_ERROR: "Some error occoured! Please contact the support team.",
    SUCCESS: "Successful!",
    UNAUTHORIZED: "Unauthorized! Session Expired. Please Login again.",
    WRONG_OTP: "Wrong Verification Code",
    INVALID_REQUEST: "Invalid Request",
    FAILED: "Login Failed",
    INSERTION_FAILED: "Unable to Insert Data in Database",
    INVALID_TOKEN: "Token is not valid",
    TOKEN_MISSING: "Auth token is not supplied",
    INVITATION_SENT: "Invitation sent Successfully!",
    ACCESS_DENIED: "Access Denied!",
    VERIFIED: "Succesfully Verified",
    ERROR: "Something went wrong!",
    LINK_SENT: "Password reset link sent",
    PASSWORD_LINK_EXPIRED: "Password reset link expired",
    FAILURE: "Failed",
    INCORRECT_OLD_PASSWORD: "Incorrect old password",
    PASSWORD_UPDATED: "Password changed successfully",
    EMAIL_SENT: "Email Sent Successfully!",
    USER_ALREADY_REGISTERED: "User is already registered with us. Try signin in.",
    PASSWORD_NOT_MATCHED: "Password did not match, try again.",
    SAME_PASSWORD: "New password can't be same as old password",
    PLEASE_PROVIDE_SEARCH_VALUE : "Please provide search value.",
    PASSWORD_CREATED : "Password created successfully!",
};

exports.responseFlags = {
    EMAIL_NOT_VERIFIED: 301,
    NO_DATA_SUCCESS: 201,
    PARAMETER_MISSING: 400,
    SERVER_ERROR: 503,
    SUCCESS: 200,
    UNAUTHORIZED_CREDENTIALS: 401,
    WRONG_OTP: 401,
    INVALID_SUBJECT: 201,
    INVALID_TOPIC: 201
};

exports.sendCustomResponse = function (res, message, status, data) {
    message = message ? message : module.exports.responseMessages.SUCCESS;
    status = status ? status : module.exports.responseFlags.SUCCESS;
    data = data ? data : {};
    res.send({
        message,
        status,
        data
    });
}

exports.sendSuccess = function (res, message, status, data) {
    message = message ? message : module.exports.responseMessages.SUCCESS;
    status = status ? status : module.exports.responseFlags.SUCCESS;
    data = data ? data : {};
    res.status(status).send({
      status: status,
      message: message,
      data: data,
    });
}

exports.sendFailure = function (res, message, status, data) {
    message = message;
    status = status ? status : module.exports.responseFlags.PARAMETER_MISSING;
    data = data ? data : {};
    res.status(status).send({
        status: status,
        message: message,
        data: data,
      });
}
function define(obj, name, value) {
    Object.defineProperty(obj, name, {
        value: value,
        enumerable: true,
        writable: false,
        configurable: true
    });
}
exports.DEVICE_TYPE = {
    WEB: 0,
    ANDROID: 1,
    IOS: 2
};

module.exports = {
    DEVICE_TYPE:{
        ANDROID:'ANDROID',
        IOS:'IOS',
        WEB:'WEB'
    }
}

exports.responseMessages = {};
define(exports.responseMessages, 'PARAMETER_MISSING', 'Insufficient information was supplied. Please check and try again.');
define(exports.responseMessages, "SOMETHING_WENT_WRONG", "Something went wrong. Please try again later");
define(exports.responseMessages, 'ACTION_COMPLETE', 'Successful');

//FOR FLAGS
exports.responseFlags = {};
define(exports.responseFlags, 'PARAMETER_MISSING', 100);
define(exports.responseFlags, 'SHOW_ERROR_MESSAGE', 201);
define(exports.responseFlags, 'ACTION_COMPLETE', 200);

exports.requestMethods = {
    GET: "GET",
    POST: "POST"
};

exports.MAIL_TYPE = {
    TEXT: 'text',
    HTML: "html"
};
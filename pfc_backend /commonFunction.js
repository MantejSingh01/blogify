var request            = require('request');

exports.checkBlank = function (arr, apiReference) {
    if (!Array.isArray(arr)) {
        return 1;
    }
    var arrlength = arr.length;
    for (var i = 0; i < arrlength; i++) {
        if (arr[i] === undefined || arr[i] == null) {
            arr[i] = "";
        } else {
            arr[i] = arr[i];
        }
        arr[i] = arr[i].toString().trim();
        if (arr[i] === '' || arr[i] === "" || arr[i] === undefined) {
            return 1;
        }
    }
    return 0;
};

exports.sendHttpRequest = function (opts) {
    var options = opts.options;
    return new Promise((resolve, reject) => {
        console.log('HTTP_REQUEST:', options );
        request(options, (error, response, body) => {
            if (error) {
                console.log( 'Error from external server', error );
                return reject(error);
            }
            if (response == undefined) {
                error = new Error('No response from external server');
                return reject(error);
            }
            if (response.statusCode < '200' || response.statusCode > '299') {
                error = new Error('Couldn\'t request with external server ');
                error.code = response.statusCode;
                console.log( 'Error from external server', error );
                return reject(error);
            }
            console.log('Response from external server', response, body);
            return resolve(body);
        });
    });
};

var jwt = require('jsonwebtoken');
const Handlebars = require("handlebars");

var issue = payload => {
    return jwt.sign(payload, 'worldisfullofdevelopers', {expiresIn: 3600000});
};
var verify = (token, cb) => {
    return jwt.verify(token, 'worldisfullofdevelopers', {}, cb);
};
async function setPrecision(no,precision){
    precision=precision || 2;
    if(!isNaN(no)){
    return parseFloat((no).toFixed(precision))
    }else{
      return 0;
    }
}
module.exports = {
    issue: issue,
    verify: verify,
    setPrecision : setPrecision
};
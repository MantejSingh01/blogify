let userServices = require('../services/userServices');
const responseMethod = require('../lib/constants/responses');

// Admin Onboarding Management Controller
exports.register = async function (req, res) {
  try {
    const registerResult = await userServices.registerUser(req.body);
    return responseMethod.sendSuccess(res, null, null, registerResult);
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
};

exports.login = async function (req, res) {
  try {
    const loginData = {
      email: req.body.email,
      password: req.body.password
    };
    const loginResult = await userServices.loginViaPassword(loginData);
    return responseMethod.sendSuccess(res, null, null, loginResult);
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
};

exports.forgotPassword = async function (req, res) {
  try {
    const result = await userServices.sendResetPasswordLink(req.body);
    return responseMethod.sendSuccess(res, result, null, null);
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
};

exports.checkPasswordResetLink = async function (req, res) {
  try {
    const result = await userServices.checkPasswordResetLink(req, res);
    return responseMethod.sendSuccess(res, result, null, null);;
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
};

exports.resetPassword = async function (req, res) {
  try {
    const result = await userServices.resetPassswordByResetLink(req, res);
    return responseMethod.sendSuccess(res, result, null, null);
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
};

// Admin Profile Management Controller
exports.changePassword = async function (req, res) {
  try {
    const jwtDecodedData = req.decoded;
    const result = await userServices.changePassword(req.body, jwtDecodedData);
    return responseMethod.sendSuccess(res, result);
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
};

exports.getProfile = async function (req, res) {
  try {
    const jwtDecodedData = req.decoded;
    const result = await userServices.getProfile(jwtDecodedData);
    return responseMethod.sendSuccess(res, null, null, result);
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
};

exports.editProfile = async function (req, res) {
  try {
    const jwtDecodedData = req.decoded;
    const result = await userServices.editProfile(req.body, jwtDecodedData);
    return responseMethod.sendSuccess(res, null, null, result);
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
};

// Blog Management Controller
exports.addBlog = async function (req, res) {
  try {
    const jwtDecodedData = req.decoded;
    const result = await userServices.addBlog(req.body, jwtDecodedData);
    return responseMethod.sendSuccess(res, null, null, result);
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
};

exports.getAllBlogs = async function (req, res) {
  try {
    const result = await userServices.getAllBlogs(req.body);
    return responseMethod.sendSuccess(res, null, null, result);
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
};

exports.updateBlog = async function (req, res) {
  try {
    const jwtDecodedData = req.decoded;
    const result = await userServices.updateBlog(req.body, jwtDecodedData);
    return responseMethod.sendSuccess(res, null, null, result);
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
};

exports.getUserBlogs = async function (req, res) {
  try {
    const jwtDecodedData = req.decoded;
    const result = await userServices.getUserBlogs(req.body, jwtDecodedData);
    return responseMethod.sendSuccess(res, null, null, result);
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
};

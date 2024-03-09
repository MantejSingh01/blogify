const responses = require('../lib/constants/responses');
const commonFunction = require('../commonFunction');
const Models = require('../models/index');
const JwtService = require('./jwtServices');
const md5 = require('md5');
const moment = require('moment');
const _ = require("lodash");
const flatten = require("flat");
const nodemailerServices = require('../utility/email-services/nodemailerServices');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// User Onboarding Management Services
exports.registerUser = async function (registerData) {
    const { name, email, password, address, phone } = registerData;

    if (!name || !email || !password) {
        throw responses.responseMessages.PARAMETER_MISSING;
    }

    const emailExists = await Models.UserModel.findOne({ email: email });
    if (emailExists) {
        throw responses.responseMessages.EMAIL_ALREADY_REGISTERED;
    }

    const userDetails = await Models.UserModel.create({
        name: name,
        email: email,
        password: md5(password),
        address: address,
        phone: phone
    });

    const token = JwtService.issue({ _id: userDetails._id }, { strict: false });
    userDetails.set('authToken', 'Bearer ' + token, { strict: false });
    await nodemailerServices.sendConfirmationEmail(userDetails);

    return userDetails;
};

exports.loginViaPassword = async function (loginData) {
    const { email, password } = loginData;

    if (!email || !password) {
        throw responses.responseMessages.PARAMETER_MISSING;
    }

    const passwordHash = md5(password);
    const user = await Models.UserModel.findOne({ email: email, password: passwordHash });

    if (!user) {
        throw responses.responseMessages.INVALID_CREDENTIALS;
    }

    const token = JwtService.issue({ _id: user._id }, { strict: false });
    user.set('authToken', 'Bearer ' + token, { strict: false });

    return user;
};

exports.sendResetPasswordLink = async function (data) {
    const { email } = data;

    if (!email) {
        throw responses.responseMessages.PARAMETER_MISSING;
    }

    const user = await Models.UserModel.findOne({ email: email });
    if (!user) {
        throw responses.responseMessages.EMAIL_NOT_REGISTERED;
    }

    await nodemailerServices.onUserForgotPassword(user);

    return responses.responseMessages.LINK_SENT;
};

exports.checkPasswordResetLink = async function (req, res) {
    const link = await Models.LinkModel.findOne({ _id: req.params.id });
    if (!link) {
        return { message: responses.responseMessages.PASSWORD_LINK_EXPIRED, status: responses.responseFlags.NO_DATA_SUCCESS };
    }

    const start = moment(link.createdAt);
    const end = moment();
    if (end.diff(start, 'minutes') > 10) {
        return responses.responseMessages.PASSWORD_LINK_EXPIRED;
    }

    return responses.responseMessages.SUCCESS;
};

exports.resetPassswordByResetLink = async function (req, res) {
    const user = await Models.LinkModel.findOne({ _id: req.body.link });
    const password = md5(req.body.password);
    const userDetails = await Models.UserModel.findOne({ _id: user.user });

    if (userDetails.password == password) {
        return responses.responseMessages.SAME_PASSWORD
    }

    await Models.UserModel.updateOne({ _id: user.user }, { $set: { password: password } });
    await Models.LinkModel.deleteMany({ _id: req.body.link });

    return responses.responseMessages.SUCCESS
};

// User Profile Management Services
exports.getProfile = async function (jwtDecodedData) {
    const id = jwtDecodedData._id;

    if (!id) {
        throw responses.responseMessages.PARAMETER_MISSING;
    }

    const profileData = await Models.UserModel.findOne({ _id: id, isActive: true });
    if (!profileData) {
        throw { status: false, reason: responses.responseMessages.ERROR };
    }

    return profileData;
};

exports.editProfile = async function (data, jwtDecodedData) {
    const id = jwtDecodedData._id;

    if (!id) {
        throw responses.responseMessages.PARAMETER_MISSING;
    }

    const updateUserDetails = await Models.UserModel.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });
    if (!updateUserDetails) {
        throw { status: false, reason: "UPDATE ERROR" };
    }

    return updateUserDetails;
};

exports.changePassword = async function (data, jwtDecodedData) {
    const { oldPassword, newPassword, confirmPassword } = data;
    const id = jwtDecodedData._id;

    if (!id || !oldPassword || !newPassword || !confirmPassword) {
        throw responses.responseMessages.PARAMETER_MISSING;
    }

    const userDetails = await Models.UserModel.findOne({ _id: id });
    if (!userDetails) {
        throw responses.responseMessages.INVALID_TOKEN;
    }

    if (userDetails.password !== md5(oldPassword)) {
        throw responses.responseMessages.INCORRECT_OLD_PASSWORD;
    }

    if (newPassword !== confirmPassword) {
        throw responses.responseMessages.PASSWORD_NOT_MATCHED;
    }

    if (userDetails.password === md5(confirmPassword)) {
        throw responses.responseMessages.SAME_PASSWORD;
    }

    await Models.UserModel.updateOne({ _id: id }, { $set: { password: md5(confirmPassword) } });

    return responses.responseMessages.PASSWORD_UPDATED;
};

// Blog Management Services
exports.addBlog = async function (data, jwtDecodedData) {
    const { title, summary, author } = data;
    const userId = jwtDecodedData._id;

    if (!userId || !title || !summary || !author) {
        throw responses.responseMessages.PARAMETER_MISSING;
    }

    const result = await Models.BlogModel.create({ userId, title, summary, author });
    if (!result) {
        throw responses.responseMessages.INVALID_CREDENTIALS;
    }

    return result;
};

exports.getAllBlogs = async function (data, jwtDecodedData) {
    const limit = data.limit;
    const page = data.page;
    const manValues = [page, limit];
    if (commonFunction.checkBlank(manValues)) {
        return responses.responseMessages.PARAMETER_MISSING;
    }

    let criteria = {
        isDeleted: false
    };

    try {
        const count = await Models.BlogModel.countDocuments(criteria);
        let blogData = await Models.BlogModel.find(criteria)
            .limit(limit)
            .skip(limit * page)
            .sort({ createdAt: -1 });

        if (data.search == "") {
            return responses.responseMessages.PLEASE_PROVIDE_SEARCH_VALUE;
        }

        if (data.search != null) {
            let finalSearchData = [];
            for (let i = 0; i < blogData.length; i++) {
                finalSearchData.push({
                    title: blogData[i].title
                });
            }
            let dataService = _.filter(finalSearchData, (itm) => {
                const val2Str = Object.values(flatten(itm)).join("");
                return _.includes(val2Str.toLowerCase(), data.search.toLowerCase());
            });
            if (dataService.length == 0) {
                itemData = [];
            }
            let result1 = [];
            for (let j = 0; j < dataService.length; j++) {
                dataService[j].isDeleted = false;
                let flight = await Models.BlogModel.findOne(dataService[j]);
                result1.push(flight);
            }
            let jsonObject = result1.map(JSON.stringify);
            let uniqueSet = new Set(jsonObject);
            let resultData = Array.from(uniqueSet).map(JSON.parse);
            blogData = resultData;
        }
        return {
            count,
            blogData
        };
    } catch (error) {
        throw error;
    }
}

exports.updateBlog = async function (data, jwtDecodedData) {
    let id = jwtDecodedData._id;
    const blogId = data.blogId;
    const manValues = [id, blogId];
    if (commonFunction.checkBlank(manValues)) {
        throw new Error(responses.responseMessages.PARAMETER_MISSING);
    }

    try {
        let updateResult = await Models.BlogModel.findOneAndUpdate(
            { _id: ObjectId(blogId) },
            { $set: data },
            { new: true }
        );
        if (!updateResult) {
            return {
                status: false,
                reason: "UPDATE ERROR"
            };
        }
        return updateResult;
    } catch (error) {
        throw error;
    }
}

exports.getUserBlogs = async function (data, jwtDecodedData) {
    const userId = jwtDecodedData._id;
    const limit = data.limit;
    const page = data.page;
    const manValues = [userId, limit, page];
    if (commonFunction.checkBlank(manValues)) {
        throw new Error(responses.responseMessages.PARAMETER_MISSING);
    }

    let criteria = {
        userId: ObjectId(userId),
        isDeleted: false
    };

    try {
        const count = await Models.BlogModel.countDocuments(criteria);
        let blogData = await Models.BlogModel.find(criteria)
            .limit(limit)
            .skip(limit * page)
            .sort({ createdAt: -1 });

        if (data.search == "") {
            throw new Error(responses.responseMessages.PLEASE_PROVIDE_SEARCH_VALUE);
        }

        if (data.search != null) {
            let finalSearchData = [];
            for (let i = 0; i < blogData.length; i++) {
                finalSearchData.push({
                    title: blogData[i].title
                });
            }
            let dataService = _.filter(finalSearchData, (itm) => {
                const val2Str = Object.values(flatten(itm)).join("");
                return _.includes(val2Str.toLowerCase(), data.search.toLowerCase());
            });
            if (dataService.length == 0) {
                itemData = [];
            }
            let result1 = [];
            for (let j = 0; j < dataService.length; j++) {
                dataService[j].isDeleted = false;
                let flight = await Models.BlogModel.findOne(dataService[j]);
                result1.push(flight);
            }
            let jsonObject = result1.map(JSON.stringify);
            let uniqueSet = new Set(jsonObject);
            let resultData = Array.from(uniqueSet).map(JSON.parse);
            blogData = resultData;
        }
        return {
            count,
            blogData
        };
    } catch (error) {
        throw error;
    }
}


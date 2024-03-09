const express = require('express');
const userRouter = express.Router();
const middleware = require('../middleware');
const userController = require('../controllers/userController');

//User Onboarding APIs
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/forgotPassword', userController.forgotPassword);
userRouter.get('/checkForgotPassword/:id', userController.checkPasswordResetLink);
userRouter.post('/resetPassword', userController.resetPassword);
//User Profile Management APIs
userRouter.post('/changePassword', middleware.verifyToken, userController.changePassword);
userRouter.get('/getProfile', middleware.verifyToken, userController.getProfile);
userRouter.put('/editProfile', middleware.verifyToken, userController.editProfile);
//Blogs Management APIs
userRouter.post('/addBlog', middleware.verifyToken, userController.addBlog);
userRouter.post('/getAllBlogs', userController.getAllBlogs);
userRouter.put('/updateBlog', middleware.verifyToken, userController.updateBlog);
userRouter.post('/getUserBlogs', middleware.verifyToken, userController.getUserBlogs);

exports.userRouter = userRouter;

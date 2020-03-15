const express = require('express');
const router = express.Router();
const userController = require('./../controller/user.controller');

router.post('/login', userController.login);

router.post('/registration', userController.registration);

router.post('/createPost', userController.createPost);

router.post('/updatepost/:id', userController.updatePost);

router.post('/userInfo', userController.userInfo);

router.get('/userpost', userController.getUserPosts);

router.get('/deletepost/:id', userController.deletePost);

//router.delete('/deletepost/:id', userController.deletePost);

    

module.exports = router;

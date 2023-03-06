const router = require("express").Router();
const {oauth} = require('../../middleware');
const { loginUser,registerUser, deleteUser,searchUser, OAuth } = require('./user.handler');

// router.get('/',getUserProfile);
router.post('/login',loginUser);
router.post('/signup',registerUser);
router.post('/oauth',oauth, OAuth);
router.get('/search/:keyword', searchUser);
router.delete('/',deleteUser);

module.exports = router;
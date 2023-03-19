const router = require('express').Router();
const {getChat, getAllChats, createGroupChat, addToGroup, removeFromGroup,}= require('./chat.handler');
const { isAdmin } = require('./isAdmin.middleware');

router.post('/',getChat);
router.get('/',getAllChats);
router.post('/group',createGroupChat);
router.put('/group/addUser',isAdmin,addToGroup);
router.put('/group/removeUser',isAdmin,removeFromGroup);

module.exports=router;
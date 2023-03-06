const router = require('express').Router();
const { getMessages,sendMessage, deleteMessage, } = require('./message.handler');

router.get('/:chat_id',getMessages);
router.post('/',sendMessage);
router.delete('/',deleteMessage);


module.exports =router;

const router = require('express').Router();
const {chatRoute, messageRoute,userRoute} = require('./api');
const {auth} = require('./middleware/');

router.use(auth);
router.use('/user',userRoute);
router.use('/chat',chatRoute);
router.use('/message',messageRoute);
// router.use('/auth',authRoute);


module.exports= router;



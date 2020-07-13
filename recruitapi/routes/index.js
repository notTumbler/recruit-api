var express = require('express');
var router = express.Router();


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
const user = require('../controllers/userController')
const chats = require('../controllers/chatsController')
// const User = require('../models/user')



router.post('/register',user.register);
router.post('/login',user.login);
router.post('/update',user.updateUserInfo);
router.get('/user',user.getUserInfo);
router.get('/userlist',user.getUserList);

router.get('/msglist',chats.getMsgList);
router.post('/readmsg',chats.readMsg);




module.exports = router;

var express = require('express');
var router = express.Router();


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
const user = require('../controllers/userController')
const chats = require('../controllers/chatsController')
const resume = require('../controllers/resumeController')
// const User = require('../models/user')



router.post('/register',user.register);
router.post('/login',user.login);
router.post('/update',user.updateUserInfo);
router.post('/userpassword',user.getuserpassword)
router.get('/user',user.getUserInfo);
router.get('/userlist',user.getUserList);



router.get('/msglist',chats.getMsgList);
router.post('/readmsg',chats.readMsg);
router.post('/getresume',resume.getResume)
router.post('/resume',resume.postResume)



module.exports = router;

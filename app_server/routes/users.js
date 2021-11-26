var express = require('express');
var router = express.Router();
var userController=require('../controller/users')
/* GET users listing. */
router.post('/signup',userController.signup);
router.post('/signin',userController.signin);
router.get('/signout',userController.signout);


module.exports = router;

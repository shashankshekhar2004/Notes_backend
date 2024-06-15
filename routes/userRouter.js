const express = require('express');
const auth=require('../middleware/auth')
const router = express.Router();
const userCtrl =require('../controllers/userCtrl')

router.post('/register',userCtrl.registerUser );

router.post('/login',userCtrl.loginUser);
//verify token
router.get('/verify',userCtrl.verifiedToken);

module.exports = router;

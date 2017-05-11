var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   req.session.user = null; 
//   req.flash('success', '登出成功'); 
//   res.redirect('/index');
// });

module.exports = router;

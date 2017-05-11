var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');

/* GET users listing. */
router.post('/',checkNotLogin);
router.post('/', function(req, res, next) {
  var md5 = crypto.createHash('md5');
var password = md5.update(req.body.password).digest('base64');

  User.get(req.body.username, function(err, user) { 
  	if (!user) {
		req.flash('error', '用户不存在');
		return res.redirect('/login'); 
	}
	if (user.password != password) { 
	req.flash('error', '用户口令错误'); 
	return res.redirect('/login');
}
	req.session.user = user; 
	req.flash('success', '登入成功'); 
	res.redirect('/u/' + req.body.username);
 }); 
});

function checkLogin(req, res, next) { 
	if (!req.session.user) {
  		req.flash('error', '未登入'); 
		return res.redirect('/login'); }
		next(); 
	}

function checkNotLogin(req, res, next) {
      if (req.session.user) {
			req.flash('error', '已登入');
        	return res.redirect('/');
      }
			next(); 
	}

module.exports = router;

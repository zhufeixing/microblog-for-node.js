var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');

/* GET users listing. */
router.post('/', checkNotLogin);
router.post('/',function(req,res){

     if (req.body['password-repeat'] != req.body['password']) {

            req.flash('error','两次输入的口令不一致');
            return res.redirect('/reg');

     }

     //   生成口令的散列值     
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    var newUser = new User({ 
    	name: req.body.username, 
    	password: password,
     });

    //检查用户名是否已经存在
    User.get(newUser.name, function(err, user) {
		if (user)
			err = 'Username already exists.';
		if (err) {
			req.flash('error', err); 
			return res.redirect('/reg');
		}

    //如果不存在就新增用户
    newUser.save(function(err) {
		if (err) {
			req.flash('error', err); 
			return res.redirect('/reg');
		}
		req.session.user = newUser; 
		req.flash('success', '注册成功'); 
		res.redirect('/');
     });
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

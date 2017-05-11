var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Post = require('../models/post.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	Post.get(null, function(err, posts) {
		if (err) {
			posts = [];
		}
  res.render('index', { title: '首页', posts : posts,});
});
	});


router.get('/reg', checkNotLogin);
router.get('/reg', function(req, res, next) {
  res.render('reg', { title: '用户注册' });
});

router.get('/login', checkNotLogin);
router.get('/login', function(req, res, next) {
  res.render('login', { title: '用户登入' });
});

router.get('/logout', checkLogin);
router.get('/logout', function(req, res) { 
	req.session.user = null; 
	req.flash('success', '登出成功'); 
	res.redirect('/');
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

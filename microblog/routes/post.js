var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');

/* GET users listing. */
router.post('/',checkLogin);
router.post('/', function(req, res, next) {
  var currentUser = req.session.user;
  var post = new Post(currentUser.name, req.body.post);
   post.save(function(err) {
	if (err) {
		req.flash('error', err);
		return res.redirect('/');
	}
	req.flash('success', '发表成功');
	res.redirect('/u/' + currentUser.name);
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

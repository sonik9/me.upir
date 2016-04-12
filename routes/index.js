var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'UPIR.ME' , name:'Vitalii Upir Page'});

});

module.exports = router;

var express = require('express');
var router = express.Router();


//routes

router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;

var express = require('express'),
    router = express.Router();

var dbHelp = require('../db/mongo-util.js'),
    handle = require('../lib/handle.js');

router.get('/', (req, res) => {
  var id = null;
  dbHelp.find(id, (err, results) => {
      res.render('cards', {newObj: results});
  })
})

router.post('/delete/:deleteID', (req, res) => {
  var id = req.body.value;
  dbHelp.remove(id, (err, del) => {
    handle.delHandle(err, del, res);
  })
})

router.post('/', (req, res) => {
  var newQ = req.body.value.question;
  var newA = req.body.value.answer;
  dbHelp.add(newQ, newA, (err, upd) => {
    handle.errHandle(err, upd, res);
  });
})






module.exports = router;

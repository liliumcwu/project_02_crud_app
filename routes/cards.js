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

router.get('/:uniqueID', (req, res) => {
  var id = req.params.uniqueID;
  dbHelp.find(id, (err, results) => {
    res.send(results[0]); // the results array only has one element
    // because id is always unique
  })
});

router.get('/:uniqueID/edit', (req, res) => {
  var id = req.params.uniqueID;
  dbHelp.find(id, (err, results) => {
    res.render('card', {newObj: results});
  })
});

// router.post('/:uniqueID', (req, res) => {
//   var newAns = req.body.value.newAns,
//   id = req.body.value.cardId;
//   console.log('newAns in cards.js is ' + req.body.value.newAns);
//   dbHelp.update(id, newAns, (err, upd) => {
//     handle.errHandle(err, upd, res);
//   })
// })


router.put('/:uniqueID', (req, res) => {
  var newAns = req.body.value.newAns,
  id = req.body.value.cardId;
  console.log('newAns in cards.js is ' + req.body.value.newAns);
  dbHelp.update(id, newAns, (err, upd) => {
    handle.errHandle(err, upd, res);
  })
})

// router.post('/delete/:deleteID', (req, res) => {
//   var id = req.body.value;
//   dbHelp.remove(id, (err, del) => {
//     handle.delHandle(err, del, res);
//   })
// })

router.delete('/delete/:deleteID', (req, res) => {
  var id = req.body.value;
  dbHelp.remove(id, (err, del) => {
    handle.delHandle(err, del, res);
  })
})

router.post('/', (req, res) => {
  var newQ = req.body.value.question;
  var newA = req.body.value.answer;
  var wrong1 = req.body.value.wrong1;
  var wrong2 = req.body.value.wrong2;
  var wrong3 = req.body.value.wrong3;
  var cardC  = req.body.value.cardColor;
  dbHelp.add(newQ, newA, wrong1, wrong2, wrong3, cardC, (err, upd) => {
    handle.errHandle(err, upd, res);
  });
})

module.exports = router;

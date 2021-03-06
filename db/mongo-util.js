var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/cardProject';
var collection = 'cards';

//ask if right way to pass id as null or hack way
function find(id, callback) {
  mongo.connect(url, (err, db) => {
    var objId = {}
    if (id) {
      objId = {_id: objectId(id)};
      console.log('in mongo-util, objId is ' + objId);
    }
    db.collection(collection).find(objId).toArray(
      (err, results) => {
        db.close();
        callback(err, results);
    })
  })
}

function remove(id, callback) {
  mongo.connect(url, (err, db) => {
    db.collection(collection).remove(
      {_id: objectId(id)},
      (err, del) => {
        db.close();
        callback(err, del);
      }
    )
  })
}

function update(id, newAns, callback) {
  mongo.connect(url, (err, db) => {
    db.collection(collection).update(
      {_id: objectId(id)},
      {$set: {answer: newAns}},
      (err, upd) => {
        db.close();
        callback(err, upd);
      }
    )
  })
}

function add(newQ, newA, wrong1, wrong2, wrong3, cardColor, callback) {
  mongo.connect(url, (err, db) => {
    db.collection(collection).insert({question: newQ, answer: newA, wrong1: wrong1, wrong2: wrong2, wrong3: wrong3, cardColor: cardColor},
      (err, upd) => {
        db.close();
        callback(err, upd);
      });
  });
}

module.exports = {
  find,
  remove,
  update,
  add
}

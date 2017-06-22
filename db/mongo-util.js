var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').Objec
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/cardProject';
var collection = 'cards';

//ask if right way to pass id as null or hack way
function find(id, callback) {
  mongo.connect(url, (err, db) => {
    var objId = {}
    if (id) {
      objId = {_id: objectId(id)}
    }
    db.collection(collection).find(objId).toArray(
      (err, results) => {
        db.close();
        callback(err, results);
    })
  })
}

function update(id, newRent, callback) {
  mongo.connect(url, (err, db) => {
    db.collection(collection).update(
      {_id: objectId(id)},
      {$set: {rent: newRent}},
      (err, upd) => {
        db.close();
        callback(err, upd);
      }
    )
  })
}

function remove(id, callback) {
  console.log('in mongo-util, remove function');
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

function add(newQ, newA, callback) {
  //   mongo.connect(url, (err, db) => {
  //   db.collection(collection).update(
  //     {_id: objectId(id)},
  //     {$set: {rent: newRent}},
  //     (err, upd) => {
  //       db.close();
  //       callback(err, upd);
  //     }
  //   )
  // })
  mongo.connect(url, (err, db) => {
    console.log('in mongo-util, newQ is ' + newQ);
    db.collection(collection).insert({question: newQ, answer: newA},
      (err, upd) => {
        db.close();
        callback(err, upd);
      });
  });
}

module.exports = {
  find,
  update,
  remove,
  add
}

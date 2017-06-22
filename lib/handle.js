function errHandle(err, upd, res) {
 if (err) {
      console.log("ERROR!", err);
      res.json( {status: 404} )
    }
    else {
      console.log("updated  ", upd);
      res.json( {status: 200} )
    }
}

function delHandle(err, del, res) {
  if (err) {
    console.log("ERROR!", err);
    res.json( {status: 404} )
  }
  else {
    console.log("deleted  ", del);
    res.json( {status: 200} )
  }
}

module.exports = {
  errHandle,
  delHandle
}

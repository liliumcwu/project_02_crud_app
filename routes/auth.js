var express = require('express'),
    request = require('request'),
    router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const STATE = process.env.STATE;
const redirect_uri = 'http://127.0.0.1:3000/auth/authorize';
const scope = 'user';

router.get('/login', (req, res) => {
  const url = 'http://github.com/login/oauth';
  const params = `client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=${scope}&state=${STATE}`;
  res.redirect(`${url}/authorize?${params}`);
});

router.get('/authorize', (req, res) => {
  const url = 'https://github.com/login/oauth';
  var code = req.query.code;
  const params = `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`;

  var options = {
    url: `${url}/access_token?${params}`,
    headers: {
      'Accept': 'application/json'
    }
  };

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log('response', response);
      console.log('Server responded with', body); // Print the response status code if a response was received
      console.log('JSON.parse(body).access_token is', JSON.parse(body).access_token);
      // console.log('token is', token);
      // console.log('body.token_type is', body.token_type);
      req.session.access_token = JSON.parse(body).access_token;
      // res.send(req.session.access_token);
      res.redirect('/profile');
    }
    else {
      console.log('There was an error');
      console.log('Response was', response);
      console.log('Error was', error);
      console.log('response.statusCode', response.statusCode);
    }
  });
});

module.exports = router;

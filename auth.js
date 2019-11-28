'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options('/login', cors());
app.post('/login', cors(), login);
app.use(express.static('static'));

function login (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  // Credentials to check against
  let mockedUsername = 'admin';
  let mockedPassword = 'password';

  if (username && password) {
    if (username === mockedUsername && password === mockedPassword) {
      let token = jwt.sign(
        {
          username: username,
          aud: process.env.AUD,
          iss: process.env.ISSUER
        },
        process.env.SECRET,
        {
          expiresIn: '24h' // expires in 24 hours
        }
      );
      // return the JWT token for the future API calls
      res.json({
        success: true,
        message: 'Authentication successful!',
        token: token
      });
    } else {
      res.status(403).json({
        success: false,
        message: 'Incorrect username or password'
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Authentication failed! Please check the request'
    });
  }
}

app.listen(process.env.AUTH_PORT);

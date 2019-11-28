const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(boom());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// static website
app.use(express.static('static'));

// protected area
app.use('/protected', expressJwt({
    secret: process.env.SECRET,
    issuer: process.env.ISSUER,
    audience: process.env.AUD,
    requestProperty: 'accessToken',
    getToken: req => {
        return req.cookies['jwt'];
    }
}),
function(req, res) {
    res.send('Hello ' + req.accessToken.username + '!');
});

app.listen(process.env.APP_PORT);

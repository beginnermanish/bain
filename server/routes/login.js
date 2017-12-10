const userModel = require('../models/User');
const config = require('./../config');
var jwt    = require('jsonwebtoken');

var loginApi = {
    userlogin: function (req, res) {
        console.log(req.body);
        if (req.body.email && req.body.password) {
            userModel.authenticate(req.body.email, req.body.password, function (err, user) {
                if (err) {
                    console.log(err);
                    res.send(err);
                    return;
                }

                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    username: user.username,
                    email: user.email
                };
                var token = jwt.sign(payload, config.secret, {
                    expiresIn: '24h' // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Login Successful!',
                    token: token
                });

                //res.send(user);
            });
        } else {
            res.send('username and password is missing');
        }
    }
}

module.exports = loginApi;
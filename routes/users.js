const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Bring in User Model
let User = require('../models/user');

// Register Form
router.get('/register', function(req, res){
  res.render('register');
});

// Register Process
router.post('/register', function(req, res){
const name = req.body.name;
const email = req.body.email;
const username = req.body.username;
const password = req.body.password;
const password2 = req.body.password2;

req.checkBody('name', 'Name is required').notEmpty();
req.checkBody('email', 'Email is required').notEmpty();
req.checkBody('email', 'Email is not valid').notEmpty();
req.checkBody('username', 'Username is required').notEmpty();
req.checkBody('password', 'Password is required').notEmpty();
req.checkBody('password2', 'Password did not match').equals(req.body.password);

let errors = req.validationErrors();

if(errors) {
    res.render('register', {
        errors: errors
    });
}
else {
    let newUser = new User({
        name: name,
        email: email,
        username: username,
        password:password
    });

    bcrypt.getSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            if(error){
                console.log(err);
            }
            else {
                newUser.password = hash;
                newUser.save(function(err){
                    if(error) {
                        console.log(err);
                        return;
                    }
                    else {
                        req.flash('success', 'you are now registered and can now log in');
                        res.redirect('user/login');
                    }
                });
            }
        });
    });
}
});

router.get('/login', function(req, res){
    res.render('login');
})
module.exports = router;
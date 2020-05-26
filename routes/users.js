const express = require('express');
const router = express.Router();
// email modules

const http = require ('http');
const nodemailer = require ('nodemailer');


//const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Login Page
router.get('/news', forwardAuthenticated, (req, res) => res.render('news'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
  const { name, email, campus, password, password2, specialty, level, matricule, skills, additional, contact, address, gender} = req.body;


  let errors = [];
  
  // check required fields
  // checking if the fields have been input
  if (!name || !email || !password || !password2 || !specialty || !level || !matricule || !skills || !additional  || !contact || !address || !gender) {
    errors.push({ msg: 'Please enter all fields' });
  }

  //check if passwords match
  
  if (password != password2) {
	  //push to a message
   errors.push({ msg: 'Passwords do not match' });
  }
  
  //check password length
  
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (contact.length>9) {
	  errors.push ({msg:'Contact should be 9 characters please'})
  }
  
  
  if (errors.length > 0) {
    res.render('register', {
		// if any error, allow the data in the input field
      errors,
      name,
      email,
      password,
      password2,
	  specialty,
		  level,
		  matricule,
		  skills,
		  additional,
		  contact,
      address,
      campus,
		  gender
    });
  } else {
    User.findOne({ email: email })
	.then(user => {
      if (user) { // if user exists, re-render form
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
		  specialty,
		  level,
		  matricule,
		  skills,
		  additional,
		  contact,
      address,
      campus,
		  gender
		  
        });
      } else {
		  //new keyword mean new users
        const newUser = new User({
          name,
          email,
          password,
		  specialty,
		  level,
		  matricule,
		  skills,
		  additional,
		  contact,
      address,
      campus,
		  gender
		  
        });
//hash password
        /*bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
			// set password to hashed
            newUser.password = hash;  */
        

            




            



            newUser.save()
              .then(user => {

                //let mailOptions;
                //transporter.sendMail (mailOptions, function (err, info) {
	
                 // if (err)
                    //console.log (error);
                  //else 
                    //console.log ('sent')
                } );



                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                  
                );
                  
                res.redirect('/users/login');
             // })
              //.catch(err => console.log(err));
         // });
        //});
      }
    });
  }
});

                  
 
// Login handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});





module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User.model');
const Park = require('../models/Park.model');
const { isLoggedOut, isLoggedIn } = require('../middlewares');
const router = express.Router();
const saltRounds = 10;
const uploader = require('../configs/cloudinary.config');

router.get('/auth/signup', isLoggedOut, (req, res) => {
  res.render('auth/signup');
})

router.post('/auth/signup', (req, res) => {
  const { username, email, password } = req.body;
  console.log("req.body",req.body)
  if (!username || !email || !password) {
    res.render('auth/signup', { errorMessage: 'Username and password are required.'})
  }

  // const regularExpresion = new RegExp('');
  // regularExpresion.test(password)

  if (password.length < 3) {
    res.render('auth/signup', { errorMessage: 'Password should have at least 3 characters'})
  }
  // {$or: [{hasFountain: fountain ? true : false },
  //   {hasPlayGround: playground ? true : false }
  User.findOne({$or: [{ username } , { email }]})
  .then((user) => {
    if (user) {
      res.render("auth/signup", { errorMessage: "User or email already exists."});
    } else{
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPass = bcrypt.hashSync(password, salt);

      User.create({ username, email , password: hashPass })      
      //FIXME:FIXME:TODO:TODO:
        .then((newUser) => {
          console.log(username)
          console.log(hashPass)
          // return res.redirect('/');
          req.login(newUser, (error) => {
            if (error) {next(error)}
            return res.redirect('/auth/private')
          })
        })
        .catch((error) => {console.log(error);
          return res.render('auth/signup', { errorMessage: 'Server error. Try again.'})
        })
    }
    //FIXME:FIXME:FIXME:
  });  
});


router.get('/auth/private', isLoggedIn, (req, res) =>{
  User.findById(req.user.id)
  .populate("favorites")
  .then((userFavs) =>{
    console.log(userFavs)
    res.render('auth/private', {
      user: req.user, userFavs   
    }) 

  })
  
  console.log(req.user.id)
  // Park.findById
})

router.get('/auth/login', isLoggedOut, (req, res) => {
  res.render('auth/login');
})

router.post('/auth/login', passport.authenticate("local", {
  successRedirect: "/auth/private",
  failureRedirect: "/auth/login",
  passReqToCallback: true
}));

router.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

// Add bcrypt to encrypt passwords

// Add passport

const ensureLogin = require('connect-ensure-login');

router.get('/private/profile', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('auth/private', {
    user: req.user
  });
});

router.get('/profile/edit', isLoggedIn,(req, res, next) => {
  res.render('auth/edit', { user: req.user });
})

router.post('/profile/edit', uploader.single('image') ,(req, res, next) => {
  const { username } = req.body;
  if(req.file){
    // User.findOneAndUpdate({ _id: req.user._id }, { username, profile_pic: req.file.path}, )
    User.findOneAndUpdate({ _id: req.user._id }, { username:username, profile_pic: req.file.path}, { new: true })
    .then(() => {
      res.redirect('/private/profile')
    })
    .catch(error => next(error))
  }
  res.render('edit', { user: req.user });
})

module.exports = router;
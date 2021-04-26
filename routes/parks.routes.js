const express = require('express');
const {render} = require('../app');
const Park = require('../models/Park.model');
const User = require('../models/User.model');


const router = express.Router();

router.get('/', (req, res, next) => {
  Park.find({})
  .then(parks => {
    res.render('index', { parks });
  })
  .catch(error => next(error))
});


router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Park.findById(id)
  .then(park => {
    res.render('details', { park });
  })
  .catch(error => next (error))
});

//Add park to favorites
router.post('/addfavorites', (req, res, next) => {
  const { parkID } = req.body;
  // console.log(req.user)
  const { _id: userID } = req.user;
  // console.log(req.body);
  User.findById(userID)
    .then((user) =>{
      if (user) {
        const { favorites } = user;
        if (!favorites.includes(parkID)){
          User.findByIdAndUpdate(
            userID,
              { $push: { favorites : parkID }}, { new: true}
          )
            .then((user) => res.redirect(`/${parkID}`))
            .catch((error) => next(error));
        } else {
          res.redirect(`/${parkID}`);
        }
      } else {
        res.redirect(`/${parkID}`); 
      }
    })
    .catch((error) => next(error));
});

//Remove park from favorites
router.post('/aaa', (req, res, next) => {
  const { parkID } = req.body;
  const { _id: userID } = req.user;
  // console.log("park", parkID)
  // console.log("user", userID);
  User.findById(userID)
    .then((user) =>{
      if (user) {
        const { favorites } = user;
        if (favorites.includes(parkID)){
          User.findByIdAndUpdate(
            userID,
              { $pull: { favorites : parkID }}, { new: true}
          )
            .then((user) => res.redirect("/auth/private"))
            .catch((error) => next(error));
        } 
      } 
      res.redirect("/auth/private");        
    })
    .catch((error) => next(error));
});


module.exports = router;
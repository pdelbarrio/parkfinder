const express = require('express');
const {render} = require('../app');
const Park = require('../models/Park.model');
const User = require('../models/User.model');
const { isLoggedOut, isLoggedIn } = require('../middlewares');

const router = express.Router();

router.get('/find-parks',(req, res) =>{
  console.log("test")
  const { fountain, playground, toilette, trees, dogs, wifi, skate, district } = req.query;
  console.log(req.query)
  
  Park.find({$and: [{$or: [{hasFountain: fountain ? true : false },
    {hasPlayGround: playground ? true : false },
    {hasPublicToilettes: toilette ? true : false },
    {hasTrees: trees ? true : false },
    {allowsDogs: dogs ? true : false },
    {wifiService: wifi ? true : false },
    {hasSkateZone: skate ? true : false }]},
    {district: district}] })
  .then((foundParks) =>{
    if(foundParks.length === 0 ){res.render('index', {user: req.user, parks:null})}
    res.render('index', {user: req.user, parks:foundParks})
  })
  .catch((error) => next(error));
})

router.get('/', (req, res, next) => {
  Park.find({})
  .then(parks => {
    res.render('index', { user: req.user, parks });
  })
  .catch(error => next(error))
});


router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Park.findById(id)
  .then(park => {
    res.render('details', {  user: req.user, park });
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
            .then((user) => res.redirect(`/parks/${parkID}`))
            .catch((error) => next(error));
        } else {
          res.redirect(`/parks/${parkID}`);
        }
      } else {
        res.redirect(`/parks/${parkID}`); 
      }
    })
    .catch((error) => next(error));
});

//Remove park from favorites
router.post('/quitfavorites', (req, res, next) => {
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

//Find parks


module.exports = router;
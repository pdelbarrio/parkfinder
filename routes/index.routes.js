const express = require('express');
const router = express.Router();
const { isLoggedOut, isLoggedIn } = require('../middlewares');

/* GET home page */
// router.get('/', (req, res) => res.render('index'));



//tests

router.get('/', isLoggedIn, (req, res, next) => {
    Park.find({})
    .then(parks => {
      res.render('index', { parks, user: req.user });
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
  
  

module.exports = router;


const express = require('express');
const {render} = require('../app');
const Park = require('../models/Park.model');


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



module.exports = router;
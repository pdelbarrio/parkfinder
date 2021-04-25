const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res) => res.render('index'));




//tests

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


// routes/cards.routes.js
const router = require('express').Router();
const Card = require('../models/Card.model.js');

// GET route to retrieve and display all the cards
router.get('/', (req, res) => {
  Card.find().then( allCards => {
    res.json(allCards);
    // res.render('cards/cards-list.hbs', { cards });
  })
});

router.get('/create', (req, res ) => {
  res.render('cards/cards-create.hbs');
});

router.post('/create', (req, res) => {
  Card.create(req.body).then( (data) => {
    console.log(`Your Tarot card has been created`)
    res.redirect('/cards');
  });
});

router.get('/:id', (req, res) => {
  Card.findById(req.params.id).then( dataFromDB => {      
      res.send(dataFromDB);
  });
});

router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  Card.findById(id)
    .then( cardsFromDB => {
      res.render('cards/cards-edit', cardsFromDB);
    })
});

router.get('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndDelete(id)
    .then( () => {
      res.redirect('/cards')
    }).catch( err => next(err) );
});

router.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndDelete(id)
    .then( () => {
      res.redirect('/cards')
    }).catch( err => next(err) );
});

module.exports = router;

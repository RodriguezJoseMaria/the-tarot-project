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
  const {nameCard, categories, starSign, description} = req.body
  Card.create({nameCard, categories, starSign, description}).then( (newCards) => {
    // console.log(`Your Tarot card has been created`)
    res.json(newCards)
    // res.redirect('/cards');
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Card.findById(id).then( cardFromDB => {      
      res.send(cardFromDB);
  });
});

router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  Card.findById(id).then( cardFromDB => {      
      res.render('cards/cards-edit', {cardFromDB});
  });
});

router.post('/:id/edit', (req, res) => {
  const {nameCard, categories, starSign, description} = req.body
  const { id } = req.params;
  Card.findByIdAndUpdate(id, {nameCard, categories, starSign, description}, {new: true})
    .then( updateCardFromDB => {
      res.json(updateCardFromDB);
      // res.render('cards/cards-edit', {updateCardFromDB});
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

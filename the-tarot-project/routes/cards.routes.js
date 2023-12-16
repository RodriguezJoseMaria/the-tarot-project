// routes/cards.routes.js
const router = require('express').Router();
const Card = require('../models/Card.model.js');

// GET route to retrieve and display all the cards
router.get('/', (req, res) => {
  Card.find().then(allCards => {
    res.json(allCards);
    // res.render('cards/cards-list.hbs', { cards });
  })
});

router.get('/create', (req, res) => {
  res.render('cards/cards-create.hbs');
});

router.post('/create', (req, res) => {
  const { numberCard, nameCard, categories, description } = req.body

  // Transform to lowercase name card
  const nameCardToLower = nameCard.toLowerCase();

  Card.create({ numberCard, nameCard: nameCardToLower, categories, description }).then((newCards) => {
    // console.log(`Your Tarot card has been created`)
    res.redirect('/cards/create')
  }).catch(err => console.log(err));
});

router.get('/:card', (req, res) => {
  const { card } = req.params;

  Card.find({ nameCard: card }).then(cardFromDB => {
    res.send(cardFromDB);
  });
});

router.get('/:card/edit', (req, res) => {
  const { card } = req.params;
  Card.find({ nameCard: card }).then(cardFromDB => {
    res.render('cards/cards-edit', { cardFromDB });
  });
});

router.post('/:card/edit', (req, res) => {
  const { numberCard, nameCard, categories, description } = req.body
  const { card } = req.params;
  Card.findByIdAndUpdate(card, { numberCard, nameCard, categories, description }, { new: true })
    .then(updateCardFromDB => {
      res.json(updateCardFromDB);
      // res.render('cards/cards-edit', {updateCardFromDB});
    })
});

router.get('/:card/delete', (req, res, next) => {
  const { card } = req.params;
  Card.findOneAndDelete({ nameCard: card })
    .then(() => {
      res.redirect('/cards')
    }).catch(err => next(err));
});

router.delete('/:card/delete', (req, res, next) => {
  const { card } = req.params;
  Card.findOneAndDelete({ nameCard: card })
    .then(() => {
      res.redirect('/cards')
    }).catch(err => next(err));
});

module.exports = router;

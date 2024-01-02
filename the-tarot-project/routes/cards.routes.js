// routes/cards.routes.js
const router = require('express').Router();
const { getCards, createCard } = require('../controllers/cardController.js');
const Card = require('../models/Card.model.js');

// GET route to retrieve and display all the cards
router.get('/', getCards);

router.get('/create', (req, res) => {
  res.render('cards/cards-create.hbs');
});

router.post('/create', createCard);

router.get('/:card', (req, res) => {
  const { card } = req.params;

  Card.findOne({ slug: card }).then(cardFromDB => {
    res.render('cards/cards-create.hbs', cardFromDB);
  });
});

router.get('/:card/edit', (req, res) => {
  const { card } = req.params;
  Card.findOne({ nameCard: card }).then(cardFromDB => {
    console.log(cardFromDB);
    res.render('cards/cards-edit', cardFromDB);
  });
});

router.post('/edit', (req, res) => {
  const { id, categories, description } = req.body
  Card.findByIdAndUpdate(id, { categories, description }, { new: true })
    .then(() => {
      res.redirect('/cards');
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

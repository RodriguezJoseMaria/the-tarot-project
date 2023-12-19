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
    res.render('cards/cards-detail', cardFromDB);
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

// routes/cards.routes.js
const router = require('express').Router();
const { getCards, createCard } = require('../controllers/cardController.js');
const Card = require('../models/Card.model.js');
const isLoggedIn = require('../middleware/isLoggedIn.js');

// GET route to retrieve and display all the cards
router.get('/', getCards);

router.get('/create', isLoggedIn,  (req, res) => {
  res.render('cards/cards-create');
});

router.post('/create', createCard);

router.get('/cards-list', isLoggedIn, (req, res) => {
  Card.find({user: req.session.currentUser._id}).then(cardFromDB => {
  res.render('cards/cards-list', cardFromDB);
});
});

router.get('/:card/edit', isLoggedIn, (req, res) => {
  const { card } = req.params;
  Card.findOne({ nameCard: card }).then(cardFromDB => {
    console.log(cardFromDB);
    res.render('cards/cards-edit', cardFromDB);
  });
});

router.post('/edit', isLoggedIn, (req, res) => {
  const { id, categories, description } = req.body
  Card.findByIdAndUpdate(id, { categories, description }, { new: true })
    .then(() => {
      res.redirect('/cards');
    })
});

router.get('/:card/delete', isLoggedIn, (req, res, next) => {
  const { card } = req.params;
  Card.findOneAndDelete({ nameCard: card })
    .then(() => {
      res.redirect('/cards')
    }).catch(err => next(err));
});

router.delete('/:card/delete', isLoggedIn, (req, res, next) => {
  const { card } = req.params;
  Card.findOneAndDelete({ nameCard: card })
    .then(() => {
      res.redirect('/cards')
    }).catch(err => next(err));
});

router.get('/:card', (req, res) => {
  const { card } = req.params;

  Card.findOne({ slug: card }).then(cardFromDB => {
    res.render('cards/cards-create', cardFromDB);
  });
});

router.get('/:card/details', (req, res) => {
  const { card } = req.params;

  Card.findOne({ slug: card }).then(cardFromDB => {
    res.render('cards/cards-details', cardFromDB);
  });
});

router.get('/:card', (req, res) => {
  const { card } = req.params;

  Card.findOne({ slug: card }).then(cardFromDB => {
    res.render('cards/cards-create', cardFromDB);
  });
});

module.exports = router;

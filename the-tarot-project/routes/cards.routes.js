// routes/cards.routes.js
const router = require('express').Router();
const Card = require('../models/Card.model.js');

// GET route to retrieve and display all the cards
router.get('/cards', (req, res) => {
  Card.find().then(allCards => {
    res.json(allCards);
    // res.render('cards/cards-list.hbs', { cards });
  })
});

router.get('/cards/create', (req, res) => {
  res.render('cards/cards-create.hbs');
});

router.post('/cards/create', (req, res) => {
  const { nameCard, categories, starSign, description } = req.body
  Card.create({ nameCard, categories, starSign, description }).then((newCards) => {
    // console.log(`Your Tarot card has been created`)
    res.json(newCards)
    // res.redirect('/cards');
  });
});

router.get('cards/:id', (req, res) => {
  const { id } = req.params;
  Card.findById(id).then(cardFromDB => {
    res.send(cardFromDB);
  });
});

router.get('cards/:id/edit', (req, res) => {
  const { id } = req.params;
  Card.findById(id).then(cardFromDB => {
    res.render('cards/cards-edit', { cardFromDB });
  });
});

router.post('cards/:id/edit', (req, res) => {
  const { nameCard, categories, starSign, description } = req.body
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { nameCard, categories, starSign, description }, { new: true })
    .then(updateCardFromDB => {
      res.json(updateCardFromDB);
      // res.render('cards/cards-edit', {updateCardFromDB});
    })
});

router.get('cards/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/cards')
    }).catch(err => next(err));
});

router.post('cards/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/cards')
    }).catch(err => next(err));
});

module.exports = router;

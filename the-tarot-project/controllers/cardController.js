const Card = require('../models/Card.model.js');

const getCards = async (req, res) => {
  await Card.find().then(allCards => {
    // res.json(allCards);
    res.render('cards/cards-list', { allCards });
  })
}

const createCard = async (req, res) => {
  const { numberCard, nameCard, categories, description } = req.body
  console.log(numberCard, nameCard, categories, description)

  // Transform into Array categories
  const categoriesArray = categories.split(',');

  await Card.create({ numberCard, nameCard, categories: categoriesArray, description, user: req.session.currentUser._id }).then((newCards) => {
    console.log(`Your Tarot card has been created`)
    res.redirect('/cards/cards-list')
  }).catch(err => console.log(err));
}

module.exports = { getCards, createCard };

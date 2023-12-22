const Card = require('../models/Card.model.js');

const getCards = async (req, res) => {
  await Card.find().then(allCards => {
    // res.json(allCards);
    res.render('cards/cards-list.hbs', { allCards });
  })
}

const createCard = async (req, res) => {
  const { numberCard, nameCard, categories, description } = req.body
  console.log(numberCard, nameCard, categories, description)

  // Transform into Array categories
  const categoriesArray = categories.split(',');

  await Card.create({ numberCard, nameCard, categories: categoriesArray, description }).then((newCards) => {
    console.log(`Your Tarot card has been created`)
    res.redirect('/cards/create')
  }).catch(err => console.log(err));
}

module.exports = { getCards, createCard };

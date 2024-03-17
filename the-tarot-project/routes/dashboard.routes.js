const Card = require("../models/Card.model.js");
const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", async (req, res, next) => {
  console.log(req.session);

  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }
  await Card.find().then((allCards) => {
    // res.json(allCards);
    res.render("dashboard/dashboard", {
      user: req.session.currentUser,
      allCards,
    });
  });

  // res.render("dashboard/dashboard", { user: req.session.currentUser });
});

module.exports = router;

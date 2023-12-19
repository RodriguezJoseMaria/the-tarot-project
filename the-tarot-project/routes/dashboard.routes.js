const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.session);

  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }

  res.render("dashboard/dashboard", { user: req.session.currentUser });
});

module.exports = router;

const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.session);

  if (req.session.email) {
    return res.redirect("/dashboard/dashboard");
  }
  res.render("auth/login");
});

module.exports = router;

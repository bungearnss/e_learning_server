var express = require('express');
var router = express.Router();
var About = require('../models/About');
const { verifyToken } = require('../jwtHandler');

router.get('/',  function (req, res, next) {
  About.getAbout( function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
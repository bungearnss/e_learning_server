var express = require('express');
var router = express.Router();
var Usability = require('../models/Usability');
const { verifyToken } = require('../jwtHandler');

router.get('/',  function (req, res, next) {
    Usability.getUsability( function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
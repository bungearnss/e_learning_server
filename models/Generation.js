var express = require('express');
var router = express.Router();
var Generation = require('../models/Generation');
const { verifyToken } = require('../jwtHandler');

router.get('/',  function (req, res, next) {
    Generation.getGeneration( function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
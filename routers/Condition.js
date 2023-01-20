var express = require('express');
var router = express.Router();
var Condition = require('../models/Condition');

router.get('/',  function (req, res, next) {
    Condition.getCondition( function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
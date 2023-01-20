var express = require('express');
var router = express.Router();
var Category = require('../models/Category');

router.get('/:id?', function (req, res, next) {

  if (req.params.id) {

    Category.getCategoryById(req.params.id, function (err, rows) {

      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {

    Category.getAllCategorys(function (err, rows) {

      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }


    });
  }
});

module.exports = router;
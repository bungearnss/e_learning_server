var express = require('express');
var router = express.Router();
var News = require('../models/News');

router.get('/:id?', function (req, res, next) {

  if (req.params.id) {

    News.getNewsById(req.params.id, function (err, rows) {

      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {

    News.getAllNews(function (err, rows) {

      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }


    });
  }
});
router.post('/', function (req, res, next) {
  console.log(req.body)

  News.addNews(req.body, function (err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 &amp;amp;amp; 0
    }
  });
});
router.delete('/:id', function (req, res, next) {

  News.deleteNews(req.params.id, function (err, count) {

    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }

  });
});
router.put('/:id', function (req, res, next) {

  New.updateNews(req.params.id, req.body, function (err, rows) {

    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;
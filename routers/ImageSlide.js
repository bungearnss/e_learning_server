var express = require('express');
var router = express.Router();
var ImageSlide = require('../models/ImageSlide');

router.get('/:id?', function (req, res, next) {

  if (req.params.id) {

    ImageSlide.getImageSlideById(req.params.id, function (err, rows) {

      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {

    ImageSlide.getAllImageSlide(function (err, rows) {

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

  ImageSlide.addImageSlide(req.body, function (err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 &amp;amp;amp; 0
    }
  });
});
router.delete('/:id', function (req, res, next) {

  ImageSlide.deleteImageSlide(req.params.id, function (err, count) {

    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }

  });
});
router.put('/:id', function (req, res, next) {

  ImageSlide.updateImageSlide(req.params.id, req.body, function (err, rows) {

    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;
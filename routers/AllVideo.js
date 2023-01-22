var express = require('express');
var router = express.Router();
var AllVideo = require('../models/AllVideo');

router.get('/',  function (req, res) {
    AllVideo.getAllVideo( function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
var express = require("express");
var router = express.Router();
var Feature = require("../models/Feature");
const { verifyToken } = require('../jwtHandler');

router.get('/', function(req, res, next){
    Feature.getFeature( function (err, rows) {
        if (err) {
          res.json(err);
        } else {
          res.json(rows);
        }
      });
    });
    
    module.exports = router;
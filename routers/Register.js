var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
var multer = require("multer");
const fs = require("fs");
var User = require("../models/User");
var Register = require("../models/Register");

router.post("/", function (req, res, next) {
  console.log(req.body);
  User.getUserByUsername(req.body.username, function (err, rows) {
    // console.log('------------'+ rows)
    console.log(JSON.stringify(rows));
    if (rows && rows.length) {
      console.log("------------มี");
      res.json("already has this username");
    } else {
      console.log("------------ไม่มี");
      Register.register(
        req.body.username,
        req.body.password,
        req.body.email,
        req.body.division,
        function (err, result) {
          if (err) {
            console.log(JSON.stringify(err));
            res.json("error");
          } else {
            console.log(result.insertId);
            Register.addProfile(
              result.insertId,
              req.body.firstname,
              req.body.lastname,
              req.body.titleid,
              req.body.username,
              req.body.address,
              req.body.phone,
              req.body.zipcode,
              req.body.company,
              req.body.province,
              1,
              req.body.position
            );
            console.log(JSON.stringify("Success"));
            res.json("success");
          }
        }
      );
    }
  });
});
router.post("/Personnel/UploadProfile", (req, res, next) => {
  try {
    const storageImage = multer.diskStorage({
      destination: (req, file, cb) => {
        const id = file.originalname;
        // console.log('=========== '+file.originalname)
        const original = "original";
        const dir = `./../uploads/user/${id}/${original}`;

        fs.mkdirSync(dir, { recursive: true });
        fs.exists(dir, (exist) => {
          if (!exist) {
            return fs.mkdir(dir, (error) => cb(error, dir));
          }
          return cb(null, dir);
        });
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + ".jpg");
      },
    });

    const fileFilter = (req, file, cb) => {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };

    const uploadImage = multer({
      storage: storageImage,
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter: fileFilter,
    }).single("image");

    uploadImage(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }

      console.log(req.file);
      Register.addUserPersonnelImageProfile(
        req.file.filename,
        req.file.originalname,
        (err, rows) => {
          if (err) {
            const ress = {
              err: "Not save",
            };
            res.json(ress);
          } else {
            console.log("=====add name image success=====");
          }
        }
      );
    });

    //res.send(req.file);
  } catch (err) {
    res.send(400);
  }
});
module.exports = router;

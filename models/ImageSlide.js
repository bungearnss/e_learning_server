var db = require("../dbconnection"); //reference of dbconnection.js

const imageBaseUrl = "http://localhost/learning/uploads/imgslide/";

var ImageSlide = {
  getAllImageSlide: function (callback) {
    return db.query(
      "Select imgslide_id,imgslide_link," +
        imageBaseUrl +
        "concat(,imgslide_id,'/original/',imgslide_picture) as imgslide_picture,imgslide_title,imgslide_detail,create_date,update_date,active from tbl_imgslide where active ='y'",
      callback
    );
  },
};
module.exports = ImageSlide;

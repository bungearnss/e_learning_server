var db=require('../dbconnection'); //reference of dbconnection.js

const featuredlinksBaseUrl = 'http://localhost/learning/uploads/';

var Feature ={

    getFeature:function(callback){
   return db.query("SELECT link_id,") + featuredlinksBaseUrl + "featuredlinks/thumb/',link_image as" 
   + "link_image, link_name,link_url,createby,createdate,updateby,updatedate,sortOrder FROM tbl_featured_links where active = '1'", callback;
    },
   /*  return db.query("SELECT * from tbl_featured_links where active = '1'", callback);
} */

};

module.exports=Feature;
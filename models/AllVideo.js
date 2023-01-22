var db=require('../dbconnection'); //reference of dbconnection.js
var AllVideo={
 
getAllVideo:function(callback){
return db.query("SELECT * FROM tbl_vdo where active = 'y'",callback);
 
}
};
 module.exports= AllVideo;
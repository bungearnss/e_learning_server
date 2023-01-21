var db=require('../dbconnection'); //reference of dbconnection.js
var Generation={
 
getGeneration:function(callback){
return db.query("SELECT * FROM tbl_generation where active = '1'",callback);
 
}
};
 module.exports=Generation;
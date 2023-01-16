var db=require('../dbconnection'); //reference of dbconnection.js


var Login = {

postLogin:function(username,password,callback){
return db.query("SELECT * FROM tbl_users where username = ? and password = ?",[username,password],callback);
 },

updateVisit:function(id,callback){
    return db.query('update tbl_users set lastvisit_at = CURRENT_TIMESTAMP where id = ?',[id],callback)
}
};

 module.exports=Login;
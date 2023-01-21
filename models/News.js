var db=require('../dbconnection'); //reference of dbconnection.js

const newsBaseUrl = 'http://localhost/learning/uploads/news/';
 
var News={
 
getAllNews:function(callback){
return db.query("Select cms_id,cms_title,cms_short_title,cms_detail," + newsBaseUrl + "concat(,cms_id,'/thumb/',cms_picture) as cms_picture,create_date,create_by,update_date,update_by,active,cms_type_display" + 
",cms_link from tbl_news where active ='y'",callback);
 
}, 
/* return db.query("select * from tbl_news where active='y'", callback);
},
 */
 getNewsById:function(id,callback){
 
return db.query("select cms_id,cms_title,cms_short_title,cms_detail,cms_link," + newsBaseUrl + "concat(,cms_id,'/thumb/',cms_picture') as cms_picture,create_date,create_by,update_date,update_by,active,cms_type_display from tbl_news where active ='y'",[id],callback);
 },

//  addNew:function(New,callback){
//  return db.query("Insert into tbl_news(course_type"+
//     ", course_number, cate_id, course_title,course_lecturer,course_short_title,course_detail,"+
//     "course_point,course_price,course_picture) values(?,?,?)",[New.Id,New.Title,New.Status],callback);
//  },

//  deleteNew:function(id,callback){
//   return db.query("delete from tbl_news where Id=?",[id],callback);
//  },
//  updateNew:function(id,New,callback){
//   return db.query("update tbl_news set Title=?,Status=? where Id=?",[New.Title,New.Status,id],callback);
//  }
 
};
 module.exports=News;
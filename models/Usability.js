var db=require('../dbconnection'); //reference of dbconnection.js
 
var Usability={
 
    getUsability:function(callback){
        return db.query("SELECT * FROM tbl_usability where active = 'y'",callback);
         
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
 module.exports=Usability;
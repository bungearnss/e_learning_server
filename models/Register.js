let db=require('../dbconnection'); //reference of dbconnection.js
let md5 = require('md5'); 
const e = require('express');
const User = require('./User');

var Register = {
    register:function(username,password,email,division,callback){
        let sql_user = "INSERT INTO tbl_users("+
        "username,password,email,activkey,department_id,repass_status,create_at,division_id,orgchart_lv2) "+
        "values(?,?,?,?,?,?,CURRENT_TIMESTAMP,?,?)";
        let time = process.hrtime()[0]+''+process.hrtime()[1];
        let activkey = md5(time+username);
        let values_user = [username,md5(password),email,activkey,1,0,division,"null",]
        db.query(sql_user,values_user,callback)
        
    },
    
    addProfile:function(id,firstname,lastname,titleid,identification,address,phone,zipcode,company,province,generation,position,callback){
        let sql_user= "INSERT INTO tbl_profiles("+
        "user_id,title_id,firstname,lastname,sex,identification,address,phone,zipcode,company,province,generation,position,type_user) "+
        "value(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        if(titleid == 1){
            var sex = "Male" 
        }
        else{
            var sex = "Female"
        }
        let value_user = [id,titleid,firstname,lastname,sex,identification,address,phone,zipcode,company,province,generation,position,1]
        db.query(sql_user,value_user,callback)
    },
    addUserPersonnelImageProfile:function(image, id, callback){
        return db.query("update tbl_users set pic_user=? where id=?",[image, id],callback);
    }
}
module.exports = Register;
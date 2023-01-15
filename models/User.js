let db=require('../dbconnection'); //reference of dbconnection.js
let md5 = require('md5'); 
let Profile=require('../models/Profile');

const userBaseUrl = 'http://localhost/learning/uploads/user/';
let User={
 
    getAllUsers:function(callback){

        return db.query("SELECT tbl_users.id,tbl_profiles_title.prof_title,tbl_profiles.position,tbl_profiles.company,tbl_profiles.address,tbl_profiles.zipcode,"+
        " tbl_users.username,tbl_users.email,tbl_profiles.title_id,tbl_profiles.firstname,tbl_profiles.phone,"+
        userBaseUrl + "tbl_users.id/original/,tbl_users.pic_user as pic_user,"+
        
        " tbl_profiles.lastname,tbl_profiles.identification,tbl_profiles.department,tbl_users.division_id,tbl_users.repass_status"+
        " FROM tbl_users INNER JOIN tbl_profiles ON tbl_profiles.user_id = tbl_users.id"+
        " INNER JOIN tbl_profiles_title ON tbl_profiles.title_id = tbl_profiles_title.prof_id  where del_status != 1 and tbl_users.status = 1",callback);
         
        },
        getUserById:function(id,callback){ 
            return db.query("SELECT tbl_profiles.province,tbl_profiles.sex,tbl_profiles_title.prof_title,tbl_users.username,tbl_users.email,tbl_profiles.title_id,tbl_profiles.position,tbl_profiles.company,tbl_profiles.address,"+
            "tbl_profiles.zipcode,tbl_profiles.firstname,tbl_profiles.phone,tbl_profiles.type_user,tbl_type_user.name,tbl_profiles.lastname, tbl_users.company_id,"+
            userBaseUrl + "tbl_users.id,'/original/',tbl_users.pic_user as pic_user"+
            ",tbl_division.id,tbl_division.dep_title"+
            ",tbl_profiles.identification,tbl_profiles.department,tbl_users.division_id,tbl_users.repass_status FROM tbl_users "+
            /* "INNER JOIN tbl_company ON tbl_users.company_id = tbl_company.company_id where active = 'y'" +  */
            "INNER JOIN tbl_division ON tbl_division.id = tbl_users.division_id "+
            "INNER JOIN tbl_profiles ON tbl_profiles.user_id = tbl_users.id "+
            "INNER JOIN tbl_type_user ON tbl_type_user.id = tbl_profiles.type_user "+
            "INNER JOIN tbl_profiles_title ON tbl_profiles.title_id = tbl_profiles_title.prof_id  where tbl_users.id = ?",[id],callback);
             },

        signupUser:function(username,password,email,callback){
            let sql_user = "INSERT INTO tbl_users("+
            "username,password,email) "+
            "values(?,?,?)";
            let values_user = [username,md5(password),email]
            db.query(sql_user,values_user,callback)
        },
        getUserByUsername:function(username,callback){
            console.log('username----------'+username)
            // return db.query("SELECT username "+
            // "From tbl_users "+
            // "Where username = ?",[username],callback)
            return db.query("SELECT username FROM tbl_users WHERE username = ?",[username],callback);
            //console.log(sql)
         },
        
         addUser:function(User,callback){
             let sql_user = "Insert into tbl_users("+
             "username,password,email,activkey,status,division_id,repass_status) "+
             "values(?,?,?,?,?,?,?)";
             let time = process.hrtime()[0]+''+process.hrtime()[1];
             User.activkey = md5(time+User.identification);
             var res = User.identification.substring(7, 14);
             let values_user =[User.identification,md5(res),User.email,User.activkey,0,User.division_id,0];
        
            db.query(sql_user,values_user, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted, ID: " + result.insertId);
                //upload file
                User.user_id = result.insertId;
                if (User.title_id == 1) {
                    User.sex = "Male";
                }else
                {
                    User.sex = "Female";
                }
        
            return Profile.addProfile(User,callback);
            });
         },
         pickerTitle:function(callback){
            return db.query("SELECT * FROM tbl_profiles_title ",callback)
        },
         updateUser:function(id,username,email,division,callback){
            let sql_user = "update tbl_users set ";
            sql_user += "username =?, email=?,division_id=? where id=? ";
            let values_user =[username,email,division,id];
            db.query(sql_user,values_user,callback)
         },
         
        deleteUser:function(id,callback){
            return db.query("update tbl_users set del_status = 1 where id=?",[id],callback);
           },
        findByEmail:function(email,callback){
            return db.query("SELECT tbl_users.id,tbl_users.activkey,tbl_profiles_title.prof_title,"+
            " tbl_users.username,tbl_users.email,tbl_profiles.title_id,tbl_profiles.firstname,tbl_profiles.phone,"+
            userBaseUrl + "tbl_users.id,'/original/',tbl_users.pic_user as pic_user,"+
            " tbl_profiles.lastname,tbl_profiles.identification,tbl_profiles.department,tbl_users.division_id,tbl_users.repass_status"+
            " FROM tbl_users INNER JOIN tbl_profiles ON tbl_profiles.user_id = tbl_users.id"+
            " INNER JOIN tbl_profiles_title ON tbl_profiles.title_id = tbl_profiles_title.prof_id  where tbl_users.del_status != 1 and tbl_users.email = ?",[email],callback);
           },
        province:(callback)=>{
            return db.query(`SELECT * FROM tbl_province`,callback)
           },
        division:(callback)=>{
            return db.query('SELECT * FROM tbl_division',callback)
        } 
        };
         module.exports=User;
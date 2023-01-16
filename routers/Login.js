var express = require('express');
var router = express.Router();
var Login =require('../models/Login')
var md5 =require('md5');
var { getToken } = require('../jwtHandler');

router.post('/', (req,res)=>{
let passwordMD5 = md5(req.body.password)
 Login.postLogin(req.body.username,passwordMD5,(err,rows)=>{
     if (rows.length > 0) {
         //res.json(rows[0].username)
        var _username = rows[0].username;
        var _id = rows[0].id;
        Login.updateVisit(_id)
        var token = getToken({ id: _id, username: _username })

        const finalResult = {
          result: "success",
          id: _id.toString(),
          data: token
        };

        console.log(JSON.stringify(finalResult));
        res.json(finalResult);    
     }else{
         //res.json(0)
         const finalResult = {
            result: "failed",
            data: ""
          };
          console.log(JSON.stringify(finalResult));
          res.json(finalResult);
     }
    })
})

module.exports = router;
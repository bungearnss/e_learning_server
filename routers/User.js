var express = require('express');
var router = express.Router();
var User = require('../models/User');
var nodemailer = require('nodemailer');
var Profile = require('../models/Profile')

const baseUrl = 'http://localhost/learning/';

router.get('/:id?', function (req, res, next) {
  if (req.params.id) {
    User.getUserById(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    User.getAllUsers(function (err, rows) { 
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.post('/forgot_password', function (req, res, next) {
  User.findByEmail(req.body.email,async function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      let data = {}
      if(rows.length == 0){
        data.status = false;
        data.msg = "Noy found information";
      }else{
        let url = baseUrl + "forgot_password/Checkpassword?activkey="+rows[0].activkey+"&id="+rows[0].id;
        let email = req.body.email;
        let message = '<center><div style="height:150px;width:400px;background-color: #2FDC86;padding-top: 50px">'+
        '<h3>Reset Password Please use link below</h3>'+
        '<br/><a style="background-color: #1BB225;color: white;margin-top:25px;padding: 14px 25px;text-align: center;'+
        'text-decoration: none;display: inline-block;" href="'+url+'">Reset Password</a></div></center>';
        /// send mail
        
        var mailOptions = {
          from: '*.******.***@gmail.com',
          to: email,
          subject: 'Reset Passwor',
          html: message 
        };
        
        data = await function_sendMail(mailOptions);
      }
      console.log(data);
      //// end send mail
      res.json(data); //or return count for 1 &amp;amp;amp; 0
    }
  });

});

router.get('/province/province',(req,res)=>{
  User.province((err,rows)=>{
    res.json(rows)
  })
})

router.get('/division/division',(req,res)=>{
  User.division((err,rows)=>{
    res.json(rows)
  })
})

router.post('/signUp', function (req, res, next) {
  User.signupUser(req.body.username,req.body.password,function (err,User){
    if(err) {
      console.log(JSON.stringify("Fail"));
      res.json("666")
    }
    else {
      console.log(JSON.stringify("Success"));
      res.json("555")
    }
  })
})
router.get('/title/title',(req,res)=>{
  User.pickerTitle((err,rows)=>{
    res.json(rows)
  })
})

router.post('/register', function (req, res, next) {
  User.addUser(req.body, function (err, User) {
    
    console.log("=====================User========================")
    console.log(User);
    if (err) {
      res.json(err);
    } else {
      let url = baseUrl +"user/activation/activation?activkey="+User.activkey+"&email="+req.body.email;
      let email = req.body.email;
      var pass = req.body.identification.substring(7, 14);
      let message = '<br><label>Hello :  '+req.body.email+'</label><br><br>'+
            '<br><br><label for="">Username and Password of you are</label><br><br><label for="">Username :</label>'+
            '<a>'+req.body.identification+'<br><br><label for="">Password :</label>'+pass+'<br><br></a>'+
        'Please activate you account go to '+ url ;
      /// send mail
      
      var mailOptions = {
        from: '*.****.***@gmail.com',
        to: email,
        subject: 'Register Successfully',
        html: message
      };
      console.log("========================activkey================");
      console.log(User.activkey);
      console.log("=====================url========================")
      console.log(url);
      function_sendMail(mailOptions);

      res.json(req.body); 
    }
  });
});
router.delete('/:id', function (req, res, next) {
  User.deleteUser(req.params.id, function (err, count) {

    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }

  });
});
router.put('/:id', function (req, res, next) {
  User.updateUser(req.params.id,req.body.username,req.body.email,req.body.division, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      Profile.updateProfile(req.params.id,req.body.title_id,req.body.firstname,req.body.lastname,req.body.phone,req.body.address,
        req.body.province,req.body.zipcode,req.body.position,req.body.company,function(err,rows){
          if(err) throw err
          else{
            res.json("success")
          }
      })
    }
  });
});

function function_sendMail(mailOptions){
  return new Promise((resolve, reject) => {
      try {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: '*.***.***@gmail.com',
            pass: '***'
          }
        });

        transporter.sendMail(mailOptions, function(error, info){
          let data = {};
          if (error) {
            data.status = false;
            data.msg = "can't sebd link for reset password";
            resolve(data);
          } else {
            data.status = true;
            data.msg = "send password successfully, please check you inbox";
            console.log('Email sent: ' + info.response);
            resolve(data);
          }
        });
      } catch (err) {
      reject(new Error('Oops!'));
      }
  });
}
module.exports = router;
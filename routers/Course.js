var express = require('express');
var router = express.Router();
var CourseOnline = require('../models/CourseOnline');

router.get('/checkprescore/:lesson_id/:user_id?',(req,res,next)=>{
  CourseOnline.checkPreScore(req.params.lesson_id,req.params.user_id,(err,rows)=>{
    if(err) throw err
    else res.json(rows[0])
  })
})

router.get('/checkpostscore/:lesson_id/:user_id?',(req,res,next)=>{
  CourseOnline.checkPostScore(req.params.lesson_id,req.params.user_id,(err,rows)=>{
    if(err) throw err
    else res.json(rows[0])
  })
})

router.get('/:id?', function (req, res, next) {
  if (req.params.id) {

    CourseOnline.getCourseOnlineById(req.params.id,async function (err, rows) {

      if (err) {
       await res.json(err);
      } else {
        await res.json(rows)
      }
    });
  } else {

    CourseOnline.getAllCourseOnlines(function (err, rows) {

      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.get('/getlesson/:id?',(req,res,next)=>{
  CourseOnline.getLessonById(req.params.id,async function(err,rows){
    if(err){
      res.json(err)
    }
    else{
      res.json(rows)
    }
  })
})
router.get('/getscorebycourse/:course_id/:user_id?',(req,res,next) =>{
  CourseOnline.getPreScoreByCourseId(req.params.course_id,req.params.user_id,(err,rows)=>{
    if(err) throw err
    else{
      res.json(rows)
    } 
  })
})
router.get('/getscorebylesson/:lesson_id/:user_id?',(req,res,next) =>{
  CourseOnline.getPreScoreByLessonId(req.params.lesson_id,req.params.user_id,(err,rows)=>{
    if(err) throw err
    else{
      if(rows.length != 0)
        res.json(rows[0])
      else{
        var msg = "no score"
        res.json(msg)
      }
    }
  })
})
router.get('/getpostscorebylesson/:lesson_id/:user_id?',(req,res,next)=>{
  CourseOnline.getPostScoreByLessonId(req.params.lesson_id,req.params.user_id,(err,rows)=>{
    if(err) throw err
    else{
      if(rows.length != 0)
        res.json(rows[0])
      else{
        var msg = "no score"
        res.json(msg)
      }
    }
  })
})
router.get('/checklearning/:lesson_id/:user_id?',(req,res,next)=>{
  CourseOnline.checkLearning(req.params.lesson_id,req.params.user_id,(err,rows)=>{
    if(err) throw err
    else{
      res.json(rows)
    }
  })
})
router.get('/getid/:id/:user_id?', function (req, res, next) {
  let courseAll = []
  let id=[];
  let index;
  if (req.params.id) {

    CourseOnline.getCourseOnlineById(req.params.id,async function (err, rows) {

      if (err) {
       await res.json(err);
      } else {
        for (let index = 0; index < rows.length;index++) {
          var course = {};
          try{
            course = rows[index];
            id[index] = course.course_id;
            let haveSurvey = await func_gethaveSurvey(id[index]);
            let statusCourseTest;
            let statusLearnAllpass;
            let countLessonAll = await func_getcountLessonAll(id[index]);

              let countLearnAll = await func_getcountLearnAll(id[index],req.params.user_id);

              if(countLearnAll == countLessonAll){
                statusLearnAllpass = true;
              }else{
                statusLearnAllpass = false;
              }

            if(haveSurvey.length > 0){
              statusCourseTest = await func_getdoSurvey(id[index],req.params.user_id,haveSurvey[0].survey_header_id);
            }else{
              statusCourseTest = statusLearnAllpass;
            }
            course.statusLearnAllpass = statusLearnAllpass;
            course.statusCourseTest = statusCourseTest;
            
            let data_course_score = await func_getCourseTestScore(id[index],req.params.user_id);
            if(data_course_score != null){
              let coursescore = {};
              coursescore.score_number = data_course_score.score_number;
              coursescore.score_total = data_course_score.score_total;
              coursescore.score_past = data_course_score.score_past;
              course.course_score = coursescore;
            }else{
              course.course_score = [];
            }

            courseAll.push(course)
          }catch(err){
            console.log(err);
          }
            
        }
          
          await res.json(courseAll)
      }
        courseAll =[];
    });
  } else {

    CourseOnline.getAllCourseOnlines(function (err, rows) {

      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.get('/cate_id/:cate_id?', function (req, res, next) {
  CourseOnline.getCourseOnlineByCateId(req.params.cate_id, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
}); 

router.get('/getCourseID/:id?',(req,res)=>{  

  CourseOnline.getCourseByUserID(req.params.id,(err,rows)=>{
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  })
})

router.get('/',(req,res)=>{
  CourseOnline.getAllCourseOnlines((err,rows)=>{
     if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  })
})

function func_getCourseTestScore(course_id,user_id) {
  return new Promise((resolve, reject) => {
    try {
      CourseOnline.getCourseTestScore(course_id,user_id, (err,rows)=>{
        resolve(rows[0]);
     })
    } catch (err) {
      reject(new Error('Oops!'));
    }
  });
}

function func_gethaveSurvey(course_id) {
  return new Promise((resolve, reject) => {
    try {
      CourseOnline.gethaveSurvey(course_id, (err,rows)=>{
        resolve(rows);
     })
    } catch (err) {
      reject(new Error('Oops!'));
    }
  });
}

function func_getdoSurvey(course_id,user_id,survey_id) {
  return new Promise((resolve, reject) => {
    try {
      CourseOnline.getdoSurvey(course_id,user_id,survey_id, (err,rows)=>{
        if (rows[0] == null) {
          resolve(false);
        } else {
          resolve(true);
        }
     })
    } catch (err) {
      reject(new Error('Oops!'));
    }
  });
}

function func_getcountLessonAll(course_id) {
  return new Promise((resolve, reject) => {
    try {
      CourseOnline.getcountLessonAll(course_id, (err,rows)=>{
          resolve(rows[0].count_lesson);
     })
    } catch (err) {
      reject(new Error('Oops!'));
    }
  });
}

function func_getcountLearnAll(course_id,user_id) {
  return new Promise((resolve, reject) => {
    try {
      CourseOnline.getcountLearnAll(course_id,user_id, (err,rows)=>{
          resolve(rows[0].count_learn);
     })
    } catch (err) {
      reject(new Error('Oops!'));
    }
  });
} 

module.exports = router;
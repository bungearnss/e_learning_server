var db=require('../dbconnection'); //reference of dbconnection.js

const courseBaseUrl = 'http://localhost/learning/uploads/courseonline/';

var CourseOnline = {
    getAllCourseOnlines: (callback) => {
        return db.query("Select tbl_course_online.course_id,tbl_course_online.course_type,tbl_course_online.course_number,"+
        "tbl_course_online.cate_id,tbl_course_online.course_title,tbl_course_online.course_lecturer,tbl_course_online.course_short_title,"+
        "tbl_course_online.course_detail,tbl_course_online.course_point,tbl_course_online.course_price,tbl_course_online.course_day_learn,"+
        + courseBaseUrl + "concat(,tbl_course_online.course_id,'/thumb/',tbl_course_online.course_picture) "+
        "as course_picture,tbl_course_online.course_book_number,tbl_course_online.course_book_date,tbl_course_online.course_rector_date,"+
        "tbl_course_online.course_hour,tbl_course_online.course_other,tbl_course_online.create_date,tbl_course_online.status,tbl_course_online.course_tax,"+
        "tbl_course_online.course_refer,tbl_course_online.course_note,tbl_course_online.create_by,tbl_course_online.update_date,tbl_course_online.update_by,"+
        "tbl_course_online.active,tbl_course_online.sortOrder,tbl_course_online.recommend,tbl_course_online.special_category,"+
        "tbl_course_online.`status`,tbl_course_online.cate_course,tbl_course_online.cate_amount,tbl_course_online.time_test,"+
        "tbl_course_online.percen_test,tbl_course_online.course_date_start,tbl_course_online.course_date_end,(select tbl_course_teacher.id "+
        "from tbl_course_teacher where tbl_course_teacher.course_id = tbl_course_online.course_id order by id desc limit 1) as "+
        "questionnaire_id,(select COUNT(tbl_coursemanage.manage_id) from tbl_coursemanage where tbl_coursemanage.id = tbl_course_online.course_id "+
        "and tbl_coursemanage.active ='y' order by manage_id desc limit 1) as havetest from tbl_course_online where active ='y'", callback);
    },
    getLessonById:(id,callback)=>{
        return db.query("select id,course_id,title,description,content,time_test,image,create_date,active,lesson_no,type "+
        "from tbl_lesson where active = 'y' and course_id = ? order by lesson_no asc",[id],callback)
    },
    getCourseOnlineById: function (id, callback) {
        return db.query("select tbl_course_online.course_day_learn,tbl_course_online.course_id,tbl_course_online.course_type,"+
        "tbl_course_online.course_number,tbl_course_online.cate_id,tbl_course_online.course_title,tbl_course_online.course_lecturer,"+
        "tbl_course_online.course_short_title,tbl_course_online.course_detail,tbl_course_online.course_point,tbl_course_online.course_price,"+
        + courseBaseUrl + "concat(,tbl_course_online.course_id,'/thumb/',tbl_course_online.course_picture) "+
        "as course_picture,tbl_course_online.course_book_number,tbl_course_online.course_book_date,tbl_course_online.course_rector_date,"+
        "tbl_course_online.course_hour,tbl_course_online.course_other,tbl_course_online.create_date,tbl_course_online.course_status,"+
        "tbl_course_online.course_tax,tbl_course_online.course_refer,tbl_course_online.course_note,tbl_course_online.create_by,"+
        "tbl_course_online.update_date,tbl_course_online.update_by,tbl_course_online.active,tbl_course_online.sortOrder,tbl_course_online.recommend,"+
        "tbl_course_online.special_category,tbl_course_online.`status`,tbl_course_online.cate_course,tbl_course_online.cate_amount,"+
        "tbl_course_online.time_test,tbl_course_online.percen_test,tbl_course_online.course_date_start,tbl_course_online.course_date_end,"+
        "(select tbl_course_teacher.id from tbl_course_teacher where tbl_course_teacher.course_id = tbl_course_online.course_id order by id desc limit 1) "+
        "as questionnaire_id,(select COUNT(tbl_coursemanage.manage_id) from tbl_coursemanage where tbl_coursemanage.id = tbl_course_online.course_id and "+
        "tbl_coursemanage.active ='y' order by manage_id desc limit 1) as havetest from tbl_course_online where active ='y' and course_id=?", [id], callback);
    },

    getCourseOnlineByCateId: function (id, callback) {
        return db.query("select tbl_course_online.course_id,tbl_course_online.course_type,tbl_course_online.course_number,tbl_course_online.cate_id,"+
        "tbl_course_online.course_title,tbl_course_online.course_lecturer,tbl_course_online.course_short_title,tbl_course_online.course_detail,"+
        "tbl_course_online.course_point,tbl_course_online.course_price," + courseBaseUrl + "concat(,"+
        "tbl_course_online.course_id,'/thumb/',tbl_course_online.course_picture) as course_picture,tbl_course_online.course_book_number,"+
        "tbl_course_online.course_book_date,tbl_course_online.course_rector_date,tbl_course_online.course_hour,tbl_course_online.course_other,"+
        "tbl_course_online.create_date,tbl_course_online.course_status,tbl_course_online.course_tax,tbl_course_online.course_refer,"+
        "tbl_course_online.course_note,tbl_course_online.create_by,tbl_course_online.update_date,tbl_course_online.update_by,"+
        "tbl_course_online.active,tbl_course_online.sortOrder,tbl_course_online.recommend,tbl_course_online.special_category,"+
        "tbl_course_online.`status`,tbl_course_online.cate_course,tbl_course_online.cate_amount,tbl_course_online.time_test,"+
        "tbl_course_online.percen_test,tbl_course_online.course_date_start,tbl_course_online.course_date_end,(select tbl_course_teacher.id "+
        "from tbl_course_teacher where tbl_course_teacher.course_id = tbl_course_online.course_id order by id desc limit 1) "+
        "as questionnaire_id,(select COUNT(tbl_coursemanage.manage_id) from tbl_coursemanage where tbl_coursemanage.id = tbl_course_online.course_id "+
        "and tbl_coursemanage.active ='y' order by manage_id desc limit 1) as havetest from tbl_course_online where active ='y' and cate_id=?", [id], callback);
    },
    getCourseByUserID: (id, callback) => {
        return db.query(`SELECT
    learn.learn_id,
	lesson.id,
	lesson.course_id,
	lesson.title,
    lesson.description,
    
    ` + courseBaseUrl + `concat(,course.course_id,'/thumb/',course.course_picture) as image,
    course.course_title,
	course.course_date_start,
	course.course_date_end,
	course.course_day_learn,
	learn.lesson_status
	FROM
	tbl_lesson as lesson,
	tbl_course_online as course,
	tbl_learn as learn
	WHERE
	lesson.course_id = course.course_id AND
	lesson.id = learn.lesson_id AND
	learn.user_id = ? AND 
	course.active = 'y' AND 
    lesson.active = 'y'
    ORDER BY course.course_id asc
	`, [id], callback) 
    },
    gethaveSurvey: function (course_id, callback) {
        return db.query("select * from tbl_course_teacher where course_id=?",
            [course_id], callback);
    },
    getdoSurvey: function (course_id, user_id,survey_id, callback) {
        return db.query("select * from q_quest_ans_course where course_id=? and user_id=? and header_id=?",
            [course_id, user_id,survey_id], callback);
    },
    getcountLessonAll: function (course_id, callback) {
        return db.query("select count(*) as count_lesson from tbl_lesson where course_id=? and active='y'",
            [course_id], callback);
    },
    getcountLearnAll: function (course_id, user_id, callback) {
        return db.query("select count(*) as count_learn from tbl_learn inner join tbl_lesson on(tbl_learn.lesson_id = tbl_lesson.id) where tbl_learn.course_id=? and tbl_learn.user_id=? and tbl_learn.active='y' and tbl_lesson.active='y' and (tbl_learn.lesson_status = 'pass' or tbl_learn.lesson_status = 'passtest')",
            [course_id, user_id], callback);
    },
    getCourseTestScore: (course_id, user_id, callback) => {
        return db.query("select * from tbl_coursescore where course_id = ? and user_id=? and active = 'y' order by score_number desc",
            [course_id, user_id], callback);
    },
    getCourseTeacher: (id, callback) => {
        return db.query("select * from tbl_course_teacher where id = ? ",
            [id], callback);
    },
    getHeader: (survey_header_id, callback) => {
        return db.query("select * from q_survey_headers where survey_header_id = ? and active = 'y'",
            [survey_header_id], callback);
    },
    getSection: (survey_header_id, callback) => {
        return db.query("select * from q_survey_sections where survey_header_id = ?",
            [survey_header_id], callback);
    },
    getQuestions: (survey_section_id, callback) => {
        return db.query("select * from q_questions where survey_section_id = ?",
            [survey_section_id], callback);
    },
    getChoices: (question_id, callback) => {
        return db.query("select * from q_option_choices where question_id = ?",
            [question_id], callback);
    },
    deleteAnswerOld:(course_id, user_id,survey_id, callback) => {
        return db.query("delete from q_quest_ans_course where course_id=? and user_id=? and header_id=?",
            [course_id, user_id,survey_id], callback);
    },
    createQQuestAns_course:(course_id, user_id,survey_id,teacher_id, callback)=>{
        return db.query("Insert into q_quest_ans_course("+
        "course_id,user_id,header_id,teacher_id,date) "+
        "values(?,?,?,?,NOW())",
            [course_id, user_id,survey_id,teacher_id], callback);
    }, 
    createQAnswers_course:(user_id, option_choice_id, logid,answer_text,answer_numeric,answer_textarea, callback)=>{
        return db.query("Insert into q_answers_course("+
        "user_id,choice_id,quest_ans_id,answer_text,answer_numeric,answer_textarea) "+
        "values(?,?,?,?,?,?)",
            [user_id, option_choice_id, logid,answer_text,answer_numeric,answer_textarea], callback);
    },
    getPreScoreByCourseId:(course_id,user_id,callback)=>{
        return db.query("select user_id,score_id,lesson_id,user_id,type,score_number,score_total,score_past,active,course_id,manage_id "+
        "from tbl_score where course_id = ? and user_id = ? and type = 'pre' and active = 'y' order by score_number desc ",[course_id,user_id],callback)
    },
    getPreScoreByLessonId:(lesson_id,user_id,callback)=>{
        return db.query("select user_id,score_id,lesson_id,user_id,type,score_number,score_total,score_past,active,course_id,manage_id "+
        "from tbl_score where lesson_id = ? and user_id = ? and type = 'pre' and active = 'y' order by score_number desc",[lesson_id,user_id],callback)
    },
    getPostScoreByLessonId:(lesson_id,user_id,callback)=>{
        return db.query("select user_id,score_id,lesson_id,user_id,type,score_number,score_total,score_past,active,course_id,manage_id "+
        "from tbl_score where lesson_id = ? and user_id = ? and type = 'post' and active = 'y' order by score_number desc",[lesson_id,user_id],callback)
    },
    checkPreScore:(lesson_id,user_id,callback)=>{
        return db.query("select user_id,score_id,lesson_id,user_id,type,score_number,score_total,score_past,active,course_id,manage_id "+
        "from tbl_score where lesson_id = ? and user_id = ? and type = 'pre' and active = 'y' and score_past = 'y' order by score_number desc",[lesson_id,user_id],callback)
    },
    checkPostScore:(lesson_id,user_id,callback)=>{
        return db.query("select user_id,score_id,lesson_id,user_id,type,score_number,score_total,score_past,active,course_id,manage_id "+
        "from tbl_score where lesson_id = ? and user_id = ? and type = 'post' and active = 'y' and score_past = 'y' order by score_number desc",[lesson_id,user_id],callback)
    },
    checkLearning:(lesson_id,user_id,callback)=>{
        return db.query(
        "select learn_id,user_id,lesson_id,learn_date,lesson_status,active "+
        "from tbl_learn where lesson_id = ? and user_id = ? and active = 'y' and (lesson_status = 'pass' or lesson_status = 'pasttest')",[lesson_id,user_id],callback
        )
    }
}; 


module.exports = CourseOnline;
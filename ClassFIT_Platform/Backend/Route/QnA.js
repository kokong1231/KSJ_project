const express = require('express');
const router = express.Router();
const getConnection = require('../Database');
const mybatis = require('mybatis-mapper');
mybatis.createMapper(['./SQL/mapper.xml']); //SQL맵핑 파일 불러오기

let format = {language: 'sql', intent: ''};

//QnA 게시판
router.post('/', function(req, res) {
    let responseData=new Array;
    getConnection((conn) => {
        const query1 = mybatis.getStatement('qna','getQ',null,format); // 문의번호, 아이디, 제목, 생성일, 비밀여부
        const query2 = mybatis.getStatement('qna','getA',null,format); // 답변번호, 제목, 생성일

        conn.query(getAskQuery,function(err,rows1){
            if(err) throw err;

            conn.query(getAnswerQuery,function(err, rows2){
                if(err) throw err;

                for(let i=0;i<rows1.length;i++){
                    for(let j=0;j<rows2.length;j++){
                        if(rows1[i].ask_number===rows2[j].answer_asknumber){
                            responseData.push(Object.assign(rows1[i],rows2[j]));
                        }
                        else{
                            responseData.push(rows1[i]);
                        }
                    }
                } //ASK_TB, ANSWER_TB 비교해서 답변이 있으면 같이 PUSH, 없으면 ASK_TB만 PUSH
                res.send(responseData);
            });
        });
    });
});

//Question 내용 읽기
router.get('/ReadQ', function(req, res) {
    getConnection((conn) => {
        const param={
            number:req.body.number
        }
        const query=mybatis.getStatement('qna','readQ',param,format); // 아이디, 제목, 내용, 생성일, 비밀여부
        conn.query(query,function(err,rows){
            if(err) throw err;
            if(rows[0].ask_lock===1&&rows[0].ask_id===req.body.id){
                res.send(rows);
            } 
            else if(rows[0].ask_lock===0){
                res.send(rows);
            }
            else res.send("fail"); //비밀글
        })
    });
});


//Question 내용 쓰기
//글자수검사 => Front
//내용필터링 => Back
router.post('/WriteQ', function(req, res) {
    if (req.session.userID !== undefined) {
        console.log(req.body);
        /*
        getConnection((conn) => {
            const query1=mybatis.getStatement('qna','orderQ',null,format);// 가장 큰 문의번호
>>>>>>> 2bbac1ac42c6ec71d1f7537667691b7544357d32

            conn.query(query1, function(err,rows1){
                if(err) throw err;
                var newDate=new Date();
                var time=newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
                const param={
                    number=rows1[0].ask_number+1,
                    id=req.body.id,
                    title=req.body.title,
                    content=req.body.content,
                    createtime=time,
                    lock=req.body.lock
                }

                const query2=mybatisMapper.getStatement('qna','writeQ',param,format);
                conn.query(query2,function(err,rows2){
                    if(err) throw err;
                    res.json(rows2);
                });
            });
            // conn.query();
            conn.release();
        });*/
        res.send({result: 'success'});
    }
    else {
        res.send({result: 'fail'});
    }
});

//Answer 내용 읽기
router.get('/ReadA', function(req, res) {
    getConnection((conn) => {
        const param={
            number : req.body.number
        };
        const query=mybatisMapper.getStatement('qna','readA',param,format);
        conn.query(query,function(err,rows){
            if(err) throw err;
            if(rows[0].ask_lock===1&&rows[0].ask_id===req.session.userId){
                res.send(rows);
            } //작성자, 접근자 일치
            else if(rows[0].ask_lock===0){
                res.send(rows);
            } //no lock
            else res.send({result: 'fail'}); //비밀답변
        });
    });
});

module.exports = router;
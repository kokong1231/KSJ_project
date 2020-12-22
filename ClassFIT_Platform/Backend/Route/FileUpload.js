const express = require('express');
const router = express.Router();
const multer = require('multer');
const getConnection = require('../Database');
const mybatis = require('mybatis-mapper');
mybatis.createMapper(['./SQL/mapper.xml']); //SQL맵핑 파일 불러오기

let format = {language: 'sql', intent: ''};

//클라이언트로부터 파일을 전송 받는 API
router.post('/upload', function(req, res) {
    if (req.session.userID !== undefined) {
        const storage = multer.diskStorage({
            destination: './upload/' + req.session.userID, //파일 저장 경로(폴더가 없을 시 자동 생성)
            filename: function(req, file, cb) {
                cb(null, file.originalname); //원본 파일명과 동일하게 저장
            }
        });

        const upload = multer({storage: storage});
        const uploadResult = upload.single('file');
 
        uploadResult(req, res, function(err) {
            if (err instanceof multer.MulterError) {
                console.log('오류 : Multer Error 1');
                res.send({result: 'fail'});
            }
            else if (err) {
                console.log('오류 : Multer Error 2');
                res.send({result: 'fail'});
            }
            else {
                res.send({result: 'success'});
            }
        });
    }
    else {
        console.log('오류 : 세션 값이 Undefined 입니다.');
        res.send({result: 'fail'});
    }
});

module.exports = router;

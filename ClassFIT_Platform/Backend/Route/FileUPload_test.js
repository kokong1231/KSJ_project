const express = require('express');
const router = express.Router();
const multer = require('multer');
const getConnection = require('../Database');
const mybatis = require('mybatis-mapper');
mybatis.createMapper(['./SQL/mapper.xml']); //SQL맵핑 파일 불러오기

const {PythonShell} = require("python-shell");
const { pathToFileURL } = require('url');
  let options = {
    scriptPath: path.join(__dirname, "../python/"),
    args: ""
};

let format = {language: 'sql', intent: ''};

const storage = multer.diskStorage({
    destination: './upload', //파일 저장 경로(폴더가 없을 시 자동 생성)
    filename: function(req, file, cb) {
        cb(null, file.originalname); //원본 파일명과 동일하게 저장
    }
});
const upload = multer({storage: storage});
const uploadResult = upload.single('file');

//클라이언트로부터 파일을 전송 받는 API
router.post('/upload', uploadResult, function(req, res, next) {
    console.log(req.file);
    
    uploadResult(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            res.send({result: 'fail'});
        }
        else if (err) {
            res.send({result: 'fail'});
        }
        else {
            res.send({result: 'success'});
            PythonShell.run("convert.py", options, function(err, data) {
            if(err) throw err;
              console.log(data);
            });
        }
    });
    
});

module.exports = router;

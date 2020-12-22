const express = require('express');
const router = express.Router();
const getConnection = require('../Database');
const mybatis = require('mybatis-mapper');
mybatis.createMapper(['./SQL/mapper.xml']); //SQL맵핑 파일 불러오기

let format = {language: 'sql', intent: ''};

//MyPage #1
router.get('/accountinfo', function(req, res) {
    getConnection((conn) => {
        const param = {
            id: req.session.userID
        };
        const query = mybatis.getStatement('mypage', 'getAccountInfo', param, format);

        conn.query(query, function(err, rows) {
            if (!err) {
                res.send({
                    result: 'success',
                    name: rows[0].user_name,
                    email: rows[0].user_email,
                    nickname: rows[0].user_nickname,
                    gender: rows[0].user_gender,
                    birthday: rows[0].user_birthday,
                    point: rows[0].user_point
                });
            }
            else {
                console.log('계정 정보 로딩 오류 : ' + err);
            }
        });
    });
});

//MyPage #2
router.get('/purchaseinfo', function(req, res) {
    getConnection((conn) => {
        const param = {
            id: req.session.userID
        };
        const query=mybatis.getStatement('mypage', 'getPurchaseInfo', param, format);

        conn.query(query, function(err, rows) {
            if (!err) {
                res.send({
                    result: 'success',
                    rows: rows
                });
            }
            else {
                console.log('구매 정보 로딩 오류 : ' + err);
            }
        });
    });
});

module.exports = router;
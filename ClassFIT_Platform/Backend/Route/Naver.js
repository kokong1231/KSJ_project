const express = require('express');
const router = express.Router();
const request = require('request');
const getConnection = require('../Database');
const mybatis = require('mybatis-mapper');
const crypto = require('crypto-random-string');

mybatis.createMapper(['./SQL/mapper.xml']); //SQL맵핑 파일 불러오기

let format = {language: 'sql', intent: ''};
let client_id = 'MUckDUr9J1Et7nitSWkX';
let client_secret = 'AreFgAfmzk';
let state = encodeURI(crypto({length: 20, type: 'alphanumeric'}));
let token = "";
let id = null;
let email = null;
let name = null;
let gender = null;
let birthday = null;
let nickname = null;

//네이버 로그인 API
router.get('/login', function (req, res) {
    let redirectURI = encodeURI('http://localhost:8080/naver/createToken');
    let api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id='
     + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
    //console.log('네이버 로그인 성공');
    res.redirect(api_url);
});

//네이버 정보 제공 재동의 API
router.get('/reprompt', function (req, res) {
    let redirectURI = encodeURI('http://localhost:8080/naver/createToken');
    let api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id='
     + client_id + '&redirect_uri=' + redirectURI + '&state=' + state + '&auth_type=reprompt';
    //console.log('네이버 회원정보 제공 재동의 성공');
    res.redirect(api_url);
});

//네이버 토큰 발급 API
router.get('/createToken', function (req, res) {
    let code = req.query.code;
    state = req.query.state;
    let redirectURI = encodeURI("/naver/profile");
    let api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
     + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    let options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let parseData = JSON.parse(body);
            token = encodeURI(parseData.access_token);
            header = "Bearer " + token;
            //console.log('네이버 토큰 발급 성공');
            res.redirect(redirectURI);
        }
        else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});


//네이버 토큰 삭제 API
router.get('/deleteToken', function (req, res) {
    let api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id='
     + client_id + '&client_secret=' + client_secret +  '&access_token=' + token + '&service_provider=NAVER';
    
    let redirectURI = encodeURI("/naver/reprompt");

    request.get(api_url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //console.log('네이버 토큰 삭제 성공');
            res.redirect(redirectURI);
        }
        else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});


//네이버 회원 프로필 조회 API
router.get('/profile', function(req, res) {

    let options = {
        url: 'https://openapi.naver.com/v1/nid/me',
        headers: {'Authorization': header}
    };

    request.get(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            let parseData = JSON.parse(body);
            //console.log(parseData);
            id = parseData.response.id;
            email = parseData.response.email;
            name = parseData.response.name;
            gender = parseData.response.gender;
            birthday = parseData.response.birthday;
            nickname = parseData.response.nickname;

            //console.log('id : ' + id + '\nemail : ' + email + '\nname : ' + name + '\ngender : ' + gender + '\nbirthday : ' + birthday + '\nnickname : ' + nickname);
            
            if (id === undefined) {
                console.log('네이버 API 오류 : ' + error);
            }
            else if (email === undefined || name === undefined || gender === undefined || birthday === undefined || nickname === undefined) {
                console.log('네이버 회원정보 재동의 필요');
                res.redirect('/naver/deleteToken');
            }
            else {
                let param = { id: id };
                let query = mybatis.getStatement('user', 'checkID', param, format);
        
                getConnection((conn) => {
                    conn.query(query, function(error, results, fields) {
                        if (!error) {
                            //console.log('조회 결과 : ' + JSON.stringify(results));
                            if (JSON.stringify(results) === '[]') {
                                let data = {
                                    id: id,
                                    email: email,
                                    name: name,
                                    gender: gender,
                                    birthday: birthday,
                                    nickname: nickname
                                };
                                let query = mybatis.getStatement('user', 'saveData', data, format);

                                conn.query(query, function(error, results, fields) {
                                    if (error) {
                                        console.log(error);
                                    }
                                });
                            }
                            //쿠키 및 세션 생성
                            state = encodeURI(crypto({length: 20, type: 'alphanumeric'}));
                            req.session.csrfToken = state;
                            req.session.userID = id;
                            //console.log('고유 ID : ' + req.session.userID);
                            //console.log('생성한 토큰 : ' + req.session.csrfToken);
                            res.cookie('classfit', req.session.csrfToken, { maxAge: 20 * 60 * 1000 });
                            res.redirect('http://localhost:3000');
                        }
                        else {
                            console.log(error);
                        }
                    });
            
                    conn.release();
                });
            }
        }
    });
});

//csrf 토큰 검증 API
router.post('/csrf', function(req, res) {
    //console.log('요청한 토큰 : ' + req.body.token + '\n서버쪽 토큰 : ' + req.session.csrfToken);
    if (req.body.token !== undefined && req.session.csrfToken !== undefined
        && req.body.token === req.session.csrfToken
        && req.session.userID !== undefined) {
        res.send({result: 'success'});
    }
    else {
        res.send({result: 'fail'});
    }
});

//로그아웃(세션 제거) API
router.post('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (!err) {
            res.send({result: 'success'});
        }
        else {
            console.log('로그아웃 실패 : ' + err)
            res.send({result: 'fail'});
        }
    });
});

module.exports = router;
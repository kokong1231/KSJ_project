const express = require('express');
const app = express();
const naver = require('./Route/Naver');
const mypage = require('./Route/MyPage');
const qna = require('./Route/QnA');
const auth = require('./Route/Auth');
const getConnection = require('./Database');
const file = require('./Route/FileUpload');
const port = process.env.PORT || 8080;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
//const fileUpload = require('express-fileupload');

//cors
app.use(cors());

//쿠키 파싱
app.use(cookieParser());

//body 데이터 파싱
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//파비콘 무시
app.use('/favicon.ico', () => {});

//세션 설정
app.use(session({
    secret: 'donthackmeplz',
    resave: false,
    saveUninitialized: false,
    cookie : { maxAge: 20 * 60 * 1000 }
}));

//파일 객체 읽기
//app.use(fileUpload());

//라우팅
app.use('/naver', naver);
app.use('/mypage',mypage);
app.use('/file', file);
app.use('/auth', auth);
app.use('/qna', qna);


app.get('/', function(req, res) {
    
});

app.listen(port, function(err) {
    if (!err) {
        console.log('\nHTTP 서버가 ' + port + '번 포트에서 실행중입니다.\n');
    }
});
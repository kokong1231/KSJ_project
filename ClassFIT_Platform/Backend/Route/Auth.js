const express = require('express');
const router = express.Router();
const multer = require('multer');
//const FormData = require('form-data');
const fs = require('fs');
const shelljs = require('shelljs');
const multiParty = require('multiparty');
const getConnection = require('../Database');
const mybatis = require('mybatis-mapper');
const { createCipher } = require('crypto');
mybatis.createMapper(['./SQL/mapper.xml']); //SQL맵핑 파일 불러오기

let format = {language: 'sql', intent: ''};

const upload = multer();

function writeFile(fileName, savePath, data) {
    savePath += fileName
    
    try {
        fs.writeFileSync(savePath, data, 'utf-8');
        console.log('WriteFile: ' + savePath);
    }
    catch(err) {
        console.log(err);
    }

}

function extractPackage(data, savePath) {
    let splitData = data.split('\n');
    
    let packageList = '';
    let packageToken;
    
    for(let i=0; i<splitData.length; i++) {
        let spaceData = [];
        spaceData[i] = splitData[i].split(' ');
        
        if(splitData[i].match('from ')) {
            // Token = spaceData[i][spaceData[i].indexOf('from') + 1].split('.');
            // packageList += spaceData[i][spaceData[i].indexOf('from') + 1] += '\n';
            packageToken = spaceData[i][spaceData[i].indexOf('from') + 1];
        }
        else if(splitData[i].match('import ')) {
            // Token = spaceData[i][spaceData[i].indexOf('import') + 1].split('.');
            // packageList += spaceData[i][spaceData[i].indexOf('import') + 1] += '\n';
            packageToken = spaceData[i][spaceData[i].indexOf('import') + 1];
        }
        // packageList += Token[0] + '\n';

        if(packageToken === 'whois') {
            packageToken = 'python-whois';
        }

        try {
            let data = fs.readFileSync(savePath + '/except_list.txt', 'utf8');
    
            if(data.search(packageToken) === -1) {
                if(packageList !== '') {
                    packageList += packageToken + '\n';
                    packageToken = '';
                }
            }
        }
        catch(err) {
            console.log(err);
        }

    }
    
    return packageList;
}

function preparedPython(userID) {
    // let command = 'cp ./python/install_package.py ./upload/' + userPath;
    let command;
    let list = ['Dockerfile', 'install_package.py', 'except_list.txt', 'test_url.txt'];

    for(let file in list) {
        command = 'cp ./python/' + list[file] + ' ./upload/' + userID;

        if(shelljs.exec(command).code !== 0) {
            shelljs.echo('Error: command failed');
            shelljs.exit(1);
        }
    }
    
}

function dockerRun(savePath) {
    let command;

    shelljs.cd(savePath);

    command = 'docker build -t verify .';
    console.log(command);
    if(shelljs.exec(command).code !== 0) {
        shelljs.echo('Error: command failed');
        shelljs.exit(1);
    }

    let workDir = shelljs.pwd();
    command = 'docker run -d -v ' + workDir + ':/app verify'; //  > build_log.txt
    console.log(command);
    if(shelljs.exec(command).code !== 0) {
        shelljs.echo('Error: command failed');
        shelljs.exit(1);
    }

    shelljs.cd('../../');
}



//피싱사이트 유효성 검증(Home 화면의 데이터 검증 탭)
router.get('/phishing', function(req, res) {

});

//파일 검증
router.post('/file', upload.single('file'), function(req, res) {
    if (req.session.userID !== undefined) {
        console.log(req.file);

        let savePath = './upload/' + req.session.userID;
        //로그 파일 읽어오기
        try {
            // let logFile = fs.readFileSync(__dirname + '/../upload/' + req.session.userID + '/build_log.txt', 'utf-8');
            let logFile = fs.readFileSync(savePath + '/build_log.txt', 'utf-8');
            let logData = logFile.toString();

            res.send({result: "success", logData: logData});
        }
        catch(exception) {
            console.error('파일 읽기 오류!!!');
        }
    }
    else {
        console.log('No Session');
    }
});

//코드 검증
router.post('/code', function(req, res) {
    if (req.session.userID !== undefined) {
        //코드를 py파일로 변환 후 검증하는 과정 필요
        
        let data = req.body.code;

        let savePath = './upload/' + req.session.userID;
        console.log(savePath);
        
        let command = 'ls -al';
        console.log(command);
        if(shelljs.exec(command).code !== 0) {
            shelljs.echo('Error: command failed');
            shelljs.exit(1);
        }

        
        let fileName = '';
        let listName = '';
        if(req.headers.referer.match('PreProcess')) {
            fileName = '/PreProcess.py';
            listName = '/PreProcess_package.txt';
        }
        else if(req.headers.referer.match('Feature')) {
            fileName = '/Feature.py';
            listName = '/Feature_package.txt';
        }        
        writeFile(fileName, savePath, data);
        fileName = '/verify.py'
        writeFile(fileName, savePath, data);

        preparedPython(req.session.userID);
        writeFile(listName, savePath, data=extractPackage(data, savePath));
        dockerRun(savePath);

        
        try {
            // let logFile = fs.readFileSync(__dirname + '/../upload/' + req.session.userID + '/build_log.txt', 'utf-8');
            let logFile = fs.readFileSync(savePath + '/build_log.txt', 'utf-8');
            console.log('logFile: ' + logFile);
            let logData = logFile.toString();
            console.log(logData);

            res.send({result: 'success', logData: logData});
        }
        catch(exception) {
            console.error('파일 읽기 오류!!!');
        }

        // res.send({result: 'success'});

    }
    else {
        console.log('No Session');
    }
});

//데이터 라벨링
router.post('/labeling', upload.single('file'), function(req, res) {
    if (req.session.userID !== undefined) {
        //라벨링 과정 필요
        //성공하면 result: success 및 라벨링에 관련된 모든 정보 반환
        console.log(req.file);
        res.send({result: 'success'});
    }
    else {
        console.log('No Session');
    }
});

//AI 모델링
router.post('/AI', upload.array('file'), function(req, res) {
    if (req.session.userID !== undefined) {
        //let form = new multiParty.Form();

        //form.parse(req, function (err, fields, files) {
        //    Object.keys(fields).forEach(function (name) {
        //        console.log('got field named ' + name);
        //    });
        //    
        //    Object.keys(files).forEach(function (name) {
        //        console.log('got file named ' + name);
        //    });
        //});
        console.log(req.files); //받은 파일(json 형태)

        let temp = req.body.file; //받은 json 값(array 형태)
        let size = temp.length;
        for (let i=0; i<size; i++) {
            console.log(JSON.parse(temp[i]));
        }

        res.send({results: 'success'});
    }
    else {
        console.log('No Session');
    }
});


module.exports = router;
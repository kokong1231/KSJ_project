const mysql = require('mysql2');
const info = require('./info.json');

let pool = mysql.createPool(info); //Pool 생성

function getConnection(callback) {
    pool.getConnection(function(err, conn) {
        if (!err) {
            callback(conn);
            console.log('\n########## DB 연결 성공 ##########\n');
        }
        else {
            console.log('\n########## DB 연결 오류 ##########\n');
        }
    });
}

module.exports = getConnection;
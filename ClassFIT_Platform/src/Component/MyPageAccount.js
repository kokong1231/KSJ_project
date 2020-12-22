import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';


class MyPageAccount extends Component {
    state = {
        upload: false,
        name: null,
        email: null,
        nickname: null,
        gender: null,
        birthday: null,
        point: null
    };

    componentDidMount() {
        let self = this;
        axios.get('/mypage/accountinfo', null)
            .then(function (response) {
                if (response.data.result === 'success') {
                    self.setState({
                        upload: true,
                        name: response.data.name,
                        email: response.data.email,
                        nickname: response.data.nickname,
                        gender: response.data.gender,
                        birthday: response.data.birthday,
                        point: response.data.point
                    });
                }
                else {
                    alert('서버로부터 계정 정보를 불러오는데 실패하였습니다.');
                }
            })
            .catch(function (error) {
                alert('오류 : ' + error);
            });
    }

    render() {
        if (this.state.upload === true) {
            return (
                <div className="MyPageAccount">
                    <div className="MyPageAccountLeft">
                        <ul>
                            <li>이름</li>
                            <li>이메일</li>
                            <li>별명</li>
                            <li>성별</li>
                            <li>생일</li>
                            <li>포인트</li>
                        </ul>
                    </div>
                    <div className="MyPageAccountMiddle">

                    </div>
                    <div className="MyPageAccountRight">
                        <ul>
                            <li>{this.state.name}</li>
                            <li>{this.state.email}</li>
                            <li>{this.state.nickname}</li>
                            <li>{this.state.gender === 'M' ? '남성' : '여성'}</li>
                            <li>{this.state.birthday}</li>
                            <li className="textColorGold">{this.state.point}</li>
                        </ul>
                    </div>
                </div>
            );
        }
        else {
            return null;
        }
       
    }
}

export default MyPageAccount;
import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import '../App.css';
import cookie from 'react-cookies';
import axios from 'axios';
import MyPageAccount from './MyPageAccount';
import MyPagePurchase from './MyPagePurchase';


class MyPage extends Component {

    state = {
        csrfAuth: 'null',
        username: null, // 닉네임
        email: null, // 이메일
        name: null, // 이름
        gender: null, // 성별
        birthday: null, // 생일
        reward: null, // 보유 리워드
        tab: 'account' // 현재 탭
    };

    componentDidMount() {
        let self = this;
        axios.post('/naver/csrf', { token: cookie.load('classfit') })
            .then(function (response) {
                if (response.data.result === 'success') {
                    self.setState({ csrfAuth: 'true' });
                }
                else {
                    self.setState({ csrfAuth: 'false' });
                    alert('토큰이 만료되었거나 올바르지 않습니다.');
                }
            })
            .catch(function (error) {
                alert('오류 : ' + error);
            });
    }

    goHome = () => {
        window.location.href = '/Home';
    }

    changeToAccountTab = () => {
        this.setState({tab: 'account'});
    }

    changeToPurchaseTab = () => {
        this.setState({tab: 'purchase'});
    }

    render() {
        if (this.state.csrfAuth === 'true') {
            return (
                <Fragment>
                    <div className="title">
                        <span className="textColorWhite">내 정보</span>
                    </div>
                    <div className="myPageFrame">
                        <div className="myPageTab">
                            <div onClick={this.changeToAccountTab} className={this.state.tab === 'account' ? "myPageAccountTab bgColorGold textColorBlack" : "myPageAccountTab" }>계정 정보</div>
                            <div onClick={this.changeToPurchaseTab} className={this.state.tab === 'purchase' ? "myPagePurchaseTab bgColorGold textColorBlack" : "myPagePurchaseTab" }>구매 정보</div>
                        </div>
                        <div className="myPageContent">
                            {this.state.tab === 'account' ? <MyPageAccount /> : null}
                            {this.state.tab === 'purchase' ? <MyPagePurchase /> : null}
                        </div>
                    </div>
                    <div className="myPageGoHomeButton ActionButton" onClick={this.goHome}>메인 화면으로</div>
                </Fragment>
            );
        }
        else if (this.state.csrfAuth === 'false') {
            return (
                <Redirect to="/LogIn" />
            );
        }
        else {
            return null;
        }
    }
}

export default MyPage;

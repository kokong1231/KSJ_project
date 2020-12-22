import React, { Component, Fragment } from 'react';
import '../App.css';
import logInButton from '../Image/login.png';

class LogIn extends Component {
    render() {
        return (
            <Fragment>
                <div className="title">
                    <span className="textColorWhite">로그인</span>
                </div>
                <div className="logIn">
                    <div>
                        <a href="http://localhost:8080/naver/login">
                            <img className="naverLogInButton" src={logInButton} alt="네이버 아이디로 로그인" />
                        </a>
                    </div>
                    <div className="signUpText">
                        ※ ClassFIT 서비스는 별도의 회원가입이 필요 없습니다.
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default LogIn;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import cookie from 'react-cookies';
import axios from 'axios';

class Menu extends Component {

    state = {
        csrfAuth: 'false'
    };
    
    componentDidMount() {
        let self = this;
        axios.post('/naver/csrf', { token: cookie.load('classfit')})
            .then(function (response) {
                if (response.data.result === 'success') {
                    self.setState({csrfAuth: 'true'});
                }
                else {
                    self.setState({csrfAuth: 'false'});
                }
            })
            .catch(function (error) {
                alert('토큰 검증 오류 : ' + error);
            });
    }
    
    logOut = () => {
        axios.post('/naver/logout', null)
            .then(function (response) {
                if (response.data.result === 'success') {
                    alert('로그아웃 되었습니다.');
                }
                else {
                    alert('로그아웃 중 서버에서 오류가 발생하였습니다.');
                }
            })
            .catch(function (error) {
                alert('로그아웃 오류 : ' + error);
            })
    }

    render() {
        let content = null;
        let content2 = null;
        if (this.state.csrfAuth === 'true') {
            content = <li onClick={this.props.toggleMenu}>
                         <Link className="listStyle" to="/MyPage/Acc">내 정보</Link>
                      </li>;
            content2 = <li onClick={() => {this.logOut(); this.props.toggleMenu();}}>
                         <Link className="listStyle" to="/Home">로그아웃</Link>
                       </li>;
        }
        else {
            content = <li onClick={this.props.toggleMenu}>
                        <Link className="listStyle" to="/LogIn">로그인</Link>
                      </li>;
        }

        if (this.state.csrfAuth === 'null') {
            return null;
        }
        else {
            return (
                <div className="menu">
                    <ul>
                        <li onClick={this.props.toggleMenu}>
                            <Link className="listStyle" to="/Home">Home</Link>
                        </li>
                        <li onClick={this.props.toggleMenu}>
                            <Link className="listStyle" to="/QnA">문의하기</Link>
                        </li>
                        {content}
                        {content2}
                    </ul>
                </div>
            );
        }
    }
}

export default Menu;
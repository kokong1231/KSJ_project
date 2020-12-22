import React, { Component, Fragment } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import '../App.css';
import { Redirect } from 'react-router-dom';

class LabelingRegist extends Component {

    state = {
        csrfAuth: 'null'
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
                    alert('로그인이 필요한 서비스입니다.');
                }
            })
            .catch(function (error) {
                alert('오류 : ' + error);
            });
    }

    render() {
        if (this.state.csrfAuth === 'true') {
            return (
                <Fragment>
                    <div className="title">
                        <span className="textColorWhite">라벨링 </span>
                        <span className="textColorGold">등록</span>
                    </div>
                    <div className="labelingRegistFrame">
                        <div className="labelingRegistField fl-l">
                            <div className="labelingRegistTextField">제목</div>
                            <div className="labelingRegistTextField">카테고리</div>
                            <div className="labelingRegistTextField">공개 여부</div>
                            <div className="labelingRegistTextField">설명</div>
                        </div>
                        <div className="labelingRegistData fl-r">
                            <div className="labelingRegistTitle">
                                <input type="text" placeholder="제목을 입력하세요." autoFocus></input>
                            </div>
                            <div className="labelingRegistCategory">
                                <select>
                                    <option>피싱사이트</option>
                                    <option>악성코드</option>
                                    <option>트래픽</option>
                                </select>
                            </div>
                            <div className="labelingRegistOpen">
                                <input type="checkbox" id="isOpen"></input>
                                <label htmlFor="isOpen">비공개</label>
                            </div>
                            <div className="labelingRegistExplain">
                                <textarea placeholder="설명을 입력하세요."></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="labelingRegistButton ActionButton">등록하기</div>
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

export default LabelingRegist;
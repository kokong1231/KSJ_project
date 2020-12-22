import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import '../App.css';
import { Redirect } from 'react-router-dom';

class QnAWrite extends Component {

    state = {
        csrfAuth: 'null',
        title: null,
        content: null
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

    changeTitle = (e) => {
        this.setState({title: e.target.value});
    }

    changeContent = (e) => {
        this.setState({content: e.target.value});
    }

    RegistQnA = async () => {
        //서버로 ajax 요청
        const regist = await axios.post('/qna/WriteQ', {title: this.state.title, content: this.state.content})
                        .then(function(response) {
                            if (response.data.result === 'success') {
                                alert('문의를 등록하였습니다.')
                            }
                            else {
                                alert('오류 : 등록 실패')
                            }
                        })
                        .catch(function(error) {
                            alert('오류 : ' + error);
                        })
    }

    render() {
        if (this.state.csrfAuth === 'true') {
            return (
                <div>
                    <div className="title">
                        <span className="textColorWhite">문의 작성</span>
                    </div>
                    <div className="QnA">
                        <table className="QnAWriteTable">
                            <thead>
                                <tr className="QnATitle">
                                    <th className="QnAWriteTitle0">제목</th>
                                    <th className="QnAWriteTableTd" width="85%"><input type="text" onChange={this.changeTitle} name="QnATitle" className="QnAWriteTitle" placeholder="제목을 입력하세요." autoFocus></input></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="QnAContent">
                                    <td className="QnAWriteTableTd" colSpan="2"><textarea onChange={this.changeContent} name="QnAContent" className="QnAWriteContent" placeholder="내용을 입력하세요."></textarea></td>
                                </tr>
                            </tbody>
                        </table>
                        <input className="QnACheckbox" type="checkbox" name="lock" />
                        <span className="QnACheckboxText">비밀 글</span>
                        <button className="QnACancelButton" type="button"><a className="QnAWriteButtonText" href="/QnA">취소</a></button>
                        <button className="QnARegisterButton" type="button" onClick={this.RegistQnA}>등록</button>
                    </div>
                </div>
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

export default QnAWrite;

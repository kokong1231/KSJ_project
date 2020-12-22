import React, { Component, Fragment } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import '../App.css';
import { Redirect } from 'react-router-dom';
import ProgressMenu from './ProgressMenu';
import LabelingComplete from './LabelingComplete';

class LabelingStart extends Component {

    state = {
        csrfAuth: 'null',
        level: 2,
        isComplete: false,
        labelingFile: null
    };

    componentDidMount() {
        let self = this;
        axios.post('/naver/csrf', { token: cookie.load('classfit')})
            .then(function (response) {
                if (response.data.result === 'success') {
                    self.setState({csrfAuth: 'true'});
                    
                    const formData = new FormData();
                    formData.append('file', self.props.location.dataAdd.originFile);
                    setTimeout(function() {
                        axios.post('/auth/labeling', formData)
                        .then(function(response) {
                            if (response.data.result === 'success') {
                                self.setState({
                                    isComplete: true,
                                    labelingFile: response.data.file
                                });
                            }
                            else {
                                alert('라벨링에 실패하였습니다.');
                            }
                        })
                        .catch(function(error) {
                            alert('라벨링 오류 : ' + error);
                        });
                    }, 5000);
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
            if (this.state.isComplete === false) {
                return (
                    <Fragment>
                        <ProgressMenu origin={this.props.location.dataAdd.origin} level={this.state.level} />
                        <div className="LabelStartLayer">
                            <div id="center">
                                <div id="main"></div>
                                <div className="row" id="r-one">
                                    <span className="sq" id="sq-1"></span>
                                    <span className="sq" id="sq-2"></span>
                                    <span className="sq" id="sq-3"></span>
                                </div>
                                <div className="row" id="r-two">
                                    <span className="sq" id="sq-4"></span>
                                    <span className="sq" id="sq-5"></span>
                                    <span className="sq" id="sq-6"></span>
                                </div>
                                <div className="row" id="r-three">
                                    <span className="sq" id="sq-7"></span>
                                    <span className="sq" id="sq-8"></span>
                                    <span className="sq" id="sq-9"></span>
                                </div>
                                <div className="row" id="r-four">
                                    <span className="sq" id="sq-10"></span>
                                    <span className="sq" id="sq-11"></span>
                                    <span className="sq" id="sq-12"></span>
                                </div>
                            </div>
                        </div>
                        <div className="LabelStartText">
                            <div className="LabelStartTextDetail">라벨링 진행 중...</div>
                            <br></br>
                            <div className="LabelStartTextTime">이 작업은 최대 몇분까지 걸립니다.</div>
                        </div>
                    </Fragment>
                );
            }
            else {
                return (
                    <LabelingComplete labelingFile={this.state.labelingFile} />
                );
            }
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

export default LabelingStart;
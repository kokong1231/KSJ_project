import React, { Component, Fragment } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import '../App.css';
import { Redirect } from 'react-router-dom';
import ProgressMenu from './ProgressMenu';
import AIComplete from './AIComplete';

class AIStart extends Component {

    state = {
        csrfAuth: 'null',
        level: 4,
        isComplete: false
    };

    componentDidMount() {
        let self = this;
        let form = new FormData();

        form.append('file', this.props.location.dataFeature.originFile);
        form.append('file', this.props.location.dataFeature.PreProcessFile);
        form.append('file', this.props.location.dataFeature.FeatureFile);

        form.append('file', JSON.stringify({isAgree: this.props.location.dataFeature.isAgree}));
        form.append('file', JSON.stringify({preprocessCode: this.props.location.dataFeature.PreProcessCode}));
        form.append('file', JSON.stringify({isPreProcessOK: this.props.location.dataFeature.isPreProcessOK}));
        form.append('file', JSON.stringify({featureCode: this.props.location.dataFeature.FeatureCode}));
        form.append('file', JSON.stringify({isFeatureOK: this.props.location.dataFeature.isFeatureOK}));
        form.append('file', JSON.stringify({origin: this.props.location.dataFeature.origin}));
        form.append('file', JSON.stringify({usedFeatrue: this.props.location.dataFeature.usedFeature}));
        form.append('file', JSON.stringify({usedAlgorithm: this.props.location.dataFeature.usedAlgorithm}));

        //let data = {
        //    isAgree: this.props.location.dataFeature.isAgree,
        //    PreProcessCode: this.props.location.dataFeature.PreProcessCode,
        //    isPreProcessOK: this.props.location.dataFeature.isPreProcessOK,
        //    FeatureCode: this.props.location.dataFeature.FeatureCode,
        //    isFeatureOK: this.props.location.dataFeature.isFeatureOK,
        //    origin: this.props.location.dataFeature.origin,
        //    usedFeature: this.props.location.dataFeature.usedFeature,
        //    usedAlgorithm: this.props.location.dataFeature.usedAlgorithm
        //};

        axios.post('/naver/csrf', { token: cookie.load('classfit')})
            .then(function (response) {
                if (response.data.result === 'success') {
                    self.setState({ csrfAuth: 'true' });
                    setTimeout(function() {
                        axios.post('/auth/AI', form)
                        .then(function (response) {
                            if (response.data.results === 'success') {
                                self.setState({ isComplete: true });
                            }
                            else {
                                alert('AI 모델링에 실패하였습니다.');
                            }
                        })
                        .catch(function (error) {
                            alert('오류 : ' + error);
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
                        <ProgressMenu origin={this.props.location.dataFeature.origin} level={this.state.level} />
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
                            <div className="LabelStartTextDetail">모델링 진행 중...</div>
                            <br></br>
                            <div className="LabelStartTextTime">이 작업은 최대 몇분까지 걸립니다.</div>
                        </div>
                    </Fragment>
                );
            }
            else {
                return (
                    <AIComplete usedFeature={this.props.location.dataFeature.usedFeature}
                        usedAlgorithm={this.props.location.dataFeature.usedAlgorithm} />
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

export default AIStart;
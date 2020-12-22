import React, { Component, Fragment } from 'react';
import '../App.css';

class AuthResult extends Component {
    render() {
        return (
            <Fragment>
                <div className="title">
                    <span className="textColorWhite">데이터 검증 결과</span>
                </div>
                <div className="modelContent">
                    <div className="modelInfo">
                        <div className="infoName">
                            사용한 모델 정보
                        </div>
                        <div className="infoContent">
                            <table className="infoTB">
                                <thead>
                                    <tr>
                                        <th>모델명</th>
                                        <th>추천수</th>
                                        <th>정확도</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>111</td>
                                        <td>222</td>
                                        <td>333</td>
                                    </tr>
                                    <tr>
                                        <td>111</td>
                                        <td>222</td>
                                        <td>333</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="arrow">
                        ▶
                    </div>
                    <div className="modelResultContent">
                        <div className="modelResult">
                            <span className="modelScore">91</span>
                        </div>
                        <div className="modelPredict">
                            <div className="modelPredictName">
                                모델별 예측 결과
                            </div>
                            <div className="modelPredictContent">
                                <table className="predictTB">
                                    <thead>
                                        <tr>
                                            <th>모델명</th>
                                            <th>판단 결과</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>111</td>
                                            <td>222</td>
                                        </tr>
                                        <tr>
                                            <td>111</td>
                                            <td>222</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="goHome">
                            <a className="ActionButton AgreePageButtonDetail goHomeButton" href="/Home">메인 화면으로</a>
                        </div>
                    </div>
                </div>   
            </Fragment>
        );
    }
}

export default AuthResult;
import React, { Component, Fragment } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


class LabelingComplete extends Component {
    
    state = {
        file: this.props.labelingFile
    };

    componentDidMount() {
        console.log('라벨링 파일 : ' + this.state.file);
    }
    
    render() {
        return (
            <Fragment>
                <div className="title">
                    <span className="textColorWhite">라벨링 </span>
                    <span className="textColorGold">결과</span>
                </div>
                <div className="labelingInfoWarningFrame">
                    <div className="labelingInfoWarningText fl-r">
                        <span>※ 부정확한 데이터로 인해 라벨링의 결과가 달라질 수 있습니다.</span>
                    </div>
                </div>
                <div className="labelingCompleteFrame">
                    <div className="modelListFrame fl-l">
                        <div className="modelListTitle">사용 모델</div>
                        <div className="modelListTable">
                            <table className="modelList">
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
                    <div className="labelingInfoFrame fl-r">
                        <div className="labelingInfo">
                            <div className="labelingInfoTitle">라벨링 정보</div>
                            <div className="labelingInfoContent">
                                <table className="labelingInfoTable">
                                    <thead>
                                        <tr>
                                            <th>항목</th>
                                            <th>결과</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>파일명</td>
                                            <td>222</td>
                                        </tr>
                                        <tr>
                                            <td>용량</td>
                                            <td>222</td>
                                        </tr>
                                        <tr>
                                            <td>라벨링 성공 데이터 수</td>
                                            <td>222</td>
                                        </tr>
                                        <tr>
                                            <td>라벨링 실패 데이터 수</td>
                                            <td>222</td>
                                        </tr>
                                        <tr>
                                            <td>수행 모델 수</td>
                                            <td>222</td>
                                        </tr>
                                        <tr>
                                            <td>예측율이 가장 높은 모델</td>
                                            <td>222</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="labelingInfoPreview ActionButton">라벨링 데이터 미리보기</div>
                        <div className="labelingInfoButtonFrame">
                            <div className="labelingInfoButton ActionButton fl-l">다운로드</div>
                            <Link className="labelingInfoButton ActionButton buttonNone fl-r"
                            to={{
                                pathname: '/LabelingRegist',
                                data: {
                                    file: this.state.file
                                }
                            }}>게시판 등록</Link>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default LabelingComplete;
import React, { Component, Fragment } from 'react';
import '../App.css';

class AIComplete extends Component {
    render() {
        return (
            <Fragment>
                <div className="title">
                    <span className="textColorWhite">모델링 </span>
                    <span className="textColorGold">결과</span>
                </div>
                <div className="AICompleteTextFrame">＊모델을 등록하여 경쟁에 참여해보세요!</div>
                <div className="AICompleteFrame">
                    <div className="AICompleteContentLeft fl-l">
                        <div className="AICompleteContentLeftTitle">모델명</div>
                        <div className="AICompleteContentLeftCategory">카테고리</div>
                        <div className="AICompleteContentLeftExplain">입력 값</div>
                        <div className="AICompleteContentLeftFile">결과</div>
                    </div>
                    <div className="AICompleteContentRight fl-r">
                        <div className="AICompleteContentRightTitle">
                            <input type="text" placeholder="모델명을 입력하세요."></input>
                        </div>
                        <div className="AICompleteContentRightCategory">
                            <select>
                                <option>피싱사이트</option>
                                <option>악성코드</option>
                                <option>트래픽</option>
                            </select>
                        </div>
                        <div className="AICompleteContentRightExplain">
                            <div><h3>특징 : {this.props.usedFeature}</h3></div>
                            <div><h3>알고리즘 : {this.props.usedAlgorithm}</h3></div>
                        </div>
                        <div className="AICompleteContentRightFile">
                            <div><h3>정확도 : </h3></div>
                            <div><h3>데이터 명 : </h3></div>
                            <div><h3>데이터 수 : </h3></div>
                        </div>
                    </div>
                </div>
                <div className="AICompleteRegistFrame">
                    <div className="AICompleteRegistButton ActionButton fl-l">등록하기</div>
                </div>
            </Fragment>
        );
    }
}

export default AIComplete;
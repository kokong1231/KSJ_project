import React, { Component, Fragment } from 'react';
import '../App.css';

class DataBoard extends Component {
    render() {
        return (
            <Fragment>
                <div className="title AddPageTitle"><div className="AddPageTitleDetail">데이터 셋 </div></div>
                <div className="DataBoardSelectBox">
                    <form>
                        <select name="Filter" className="DataBoardSelectBoxDetail">
                            <option value="">카테고리</option>
                            <option value="">피싱 사이트</option>
                            <option value="">악성 코드</option>
                            <option value="">웹 로그</option>
                        </select>
                        <input name="search" type='text' value="" className="DataBoardInputBox" placeholder="키워드를 입력하세요."></input>
                        <button type="submit" value="" className="ActionButton DataBoardSubmitButton">검색</button>
                    </form>
                </div>
                <div className="DataBoard">
                    <div>
                        <a className="ActionButton DataBoardButtonDetail DataBoardButtonDetailLeft" href="">
                            <div className="DataBoardContentTitle">
                                피싱 사이트
                            </div>
                            <div className="DataBoardContentDataValue">
                                10,000
                            </div>
                            <div className="DataBoardContentSub DataBoardContentSubLeft">
                                by. Name
                            </div>
                            <div className="DataBoardContentSub DataBoardContentSubRight">
                                    추천 123
                            </div>
                        </a>
                        <a className="ActionButton DataBoardButtonDetail DataBoardButtonDetailCenter" href="">
                            <div className="DataBoardContentTitle">
                                악성 코드
                            </div>
                            <div className="DataBoardContentDataValue">
                                59,235
                            </div>
                            <div className="DataBoardContentSub DataBoardContentSubLeft">
                                by. Name
                            </div>
                            <div className="DataBoardContentSub DataBoardContentSubRight">
                                    추천 23
                            </div>
                        </a>
                        <a className="ActionButton DataBoardButtonDetail DataBoardButtonDetailRight" href="">
                            <div className="DataBoardContentTitle">
                                웹 로그
                            </div>
                            <div className="DataBoardContentDataValue">
                                100,000
                            </div>
                            <div className="DataBoardContentSub DataBoardContentSubLeft">
                                by. Name
                            </div>
                            <div className="DataBoardContentSub DataBoardContentSubRight">
                                    추천 0
                            </div>
                        </a>
                    </div>
                    <div className="DataBoardBottom">
                        <a className="ActionButton DataBoardButtonDetail DataBoardButtonDetailLeft" href="">
                            <div className="DataBoardContentTitle">
                                피싱 사이트
                            </div>
                            <div className="DataBoardContentDataValue">
                                5,000
                            </div>
                            <div className="DataBoardContentSub DataBoardContentSubLeft">
                                by. Name
                            </div>
                            <div className="DataBoardContentSub DataBoardContentSubRight">
                                    추천 5
                            </div>
                        </a>
                        <a className="ActionButton DataBoardButtonDetail DataBoardButtonDetailCenter" href="">
                            <div className="DataBoardContentTitle">
                                악성 코드
                            </div>
                            <div className="DataBoardContentDataValue">
                                230
                            </div>
                            <div className="DataBoardContentSub DataBoardContentSubLeft">
                                by. Name
                            </div>
                            <div className="DataBoardContentSub DataBoardContentSubRight">
                                    추천 1,232
                            </div>
                        </a>
                        <a className="ActionButton DataBoardButtonDetail DataBoardButtonDetailRight" href="">
                            <div className="DataBoardContentTitle">
                                악성 코드
                            </div>
                            <div className="DataBoardContentDataValue">
                                20,000
                            </div>
                            <div className="DataBoardContentSub DataBoardContentSubLeft">
                                by. Name
                            </div>
                            <div className="DataBoardContentSub DataBoardContentSubRight">
                                    추천 10,232
                            </div>
                        </a>
                    </div>
                </div>
                <div className="DataBoardPageNumber DataBoardPageNumberDetail">
                    <div className="Pagination P1">
                        <ul>
                            <a href="#"><li>{'<'}</li></a>
                            <a className="is-active" href="#"><li>1</li></a>
                            <a href="#"><li>2</li></a>
                            <a href="#"><li>3</li></a>
                            <a href="#"><li>4</li></a>
                            <a href="#"><li>5</li></a>
                            <a href="#"><li>6</li></a>
                            <a href="#"><li>{'>'}</li></a>
                        </ul>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default DataBoard;
import React, { Component } from 'react';
import '../App.css';

class QnADisplay extends Component {

    render () {
        return (
          <div>
            <div className="title">
                <span className="textColorWhite">문의 상세보기</span>
            </div>
            <div className="QnA">
                <table className="QnAWriteTable">
                    <tbody>
                        <tr className="QnATitle">
                            <td className="QnADisplayTitle">제목</td>
                        </tr>
                        <tr>
                            <td className="QnADisplayContent" colSpan="2">내용</td>
                        </tr>
                    </tbody>
                </table>
                <button className="QnABackButton"><a class="QnAWriteButtonText" href="/QnA">돌아가기</a></button>
            </div>
          </div>
        );
    }
}

export default QnADisplay;

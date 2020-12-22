import React, { Component } from 'react';
import '../App.css';

class QnA extends Component {

    state = {
        content: null
    };

    render () {
        return (
            <div>
              <div className="title">
                  <span className="textColorWhite">문의하기</span>
              </div>
              <div className="QnA">
                  <table className="QnATable">
                      <thead className="QnAtableheight">
                          <tr>
                              <th className="QnATableTd">번호</th>
                              <th className="QnATableTd" width="70%"><a className="QnADisplayLink" href="/QnADisplay">제목</a></th>
                              <th className="QnATableTd">작성일</th>
                              <th className="QnATableTd">작성자</th>
                          </tr>
                      </thead>
                      <tbody className="QnAtableheight">
                          <tr>
                              <td className="QnATableTd">1</td>
                              <td className="QnATableTd">제목 테스트</td>
                              <td className="QnATableTd">오늘</td>
                              <td className="QnATableTd">나</td>
                          </tr>
                      </tbody>
                  </table>
                  <button className="QnAWriteButton" type="button"><a href="/QnAWrite" className="QnAWriteButtonText">문의 작성</a></button>
              </div>
            </div>
        );
    }
}

export default QnA;

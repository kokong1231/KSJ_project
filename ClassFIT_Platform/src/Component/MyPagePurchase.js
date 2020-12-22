import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';


class MyPagePurchase extends Component {

    state = {
        upload: false,
        dataList: null
    };
    
    deployRows = (rows) => {
        
    }

    componentDidMount() {
        axios.get('/mypage/purchaseinfo', null)
            .then(function (response) {
                if (response.data.result === 'success') {
                    let rows = response.data.rows;
                    let size = rows.length;
                    let content = null;

                    for (let i=0; i<size; i++) {
                        content +=
                            <tr>
                                <td>{rows[i].purchase_createtime}</td>
                                <td>{rows[i].data_title}</td>
                                <td>{rows[i].purchase_expiredtime}</td>
                            </tr>;
                    }
                    this.setState({upload: true, dataList: content});
                }
                else {
                    alert('서버로부터 구매 정보를 불러오는데 실패하였습니다.');
                }
            })
            .catch(function (error) {
                alert('오류 : ' + error);
            });
    }
    
    render() {
        if (this.state.upload === false) {
            return (
                <div className="MyPagePurchase">
                    <table className="MyPagePurchaseTable">
                        <thead>
                            <tr>
                                <th width="25%">구매일</th>
                                <th width="40%">데이터 셋</th>
                                <th width="35%">다운로드 기간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.dataList}
                        </tbody>
                    </table>
                </div>
            );
        }
        else {
            return null;
        }
    }
}

export default MyPagePurchase;
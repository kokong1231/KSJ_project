import React, { Component, Fragment } from 'react';
import '../App.css';
import Phishing from './Phishing';

const Malware = () => {
    return (
        <Fragment>
            <input type="file"></input>
            <button type="button">업로드</button>
        </Fragment>
    );
}

const Traffic = () => {
    return (
        <Fragment>
            미구현
        </Fragment>
    );
}

class Auth extends Component {

    state = {
        content: 1
    };

    changeContent = (e) => {
        if (e.target.value === 'phishing') {
            this.setState({content: 1});
        }
        else if (e.target.value === 'malware') {
            this.setState({content: 2});
        }
        else if (e.target.value === 'traffic') {
            this.setState({content: 3});
        }
        else {
            alert('컨텐츠 변경 중 오류가 발생하였습니다.');
        }
    }

    render() {
        return (
            <div>
                <select className="authSelect" onChange={this.changeContent}>
                    <option value="phishing">피싱사이트</option>
                    <option value="malware">악성코드</option>
                    <option value="traffic">트래픽</option>
                </select>
                {this.state.content === 1 ? <Phishing /> : null}
                {this.state.content === 2 ? <Malware /> : null}
                {this.state.content === 3 ? <Traffic /> : null}
            </div>
        );
    }
}

export default Auth;
import React, { Component, Fragment } from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';

class Phishing extends Component {

    state = {
        redirection: false
    };

    AuthData = () => {
        this.setState({redirection: true});
    }

    render() {
        if (this.state.redirection === true) {
            return (
                <Redirect to="/AuthResult" />
            );
        }
        else {
            return (
                <Fragment>
                    <input className="phishing" type="text" placeholder="이곳에 URL을 입력하세요."></input>
                    <button className="phishingButton" type="button" onClick={this.AuthData}>검증</button>
                </Fragment>
            );
        }
    }
}

export default Phishing;
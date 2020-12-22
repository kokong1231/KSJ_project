import React, { Component, Fragment } from 'react';
import '../App.css';
import Auth from './Auth';
import { Link } from 'react-router-dom';


const Labeling = () => {
    return (
        <div>
            <Link className="td-none goButton"
            to={{
                pathname: '/AgreeData',
                origin: 'labeling'
            }}>데이터 라벨링 시작하기</Link>
        </div>
    );
}

const AI = () => {
    return (
        <div>
            <Link className="td-none goButton"
            to={{
                pathname: '/AgreeData',
                origin: 'AI'
            }}>AI 모델링 시작하기</Link>
        </div>
    );
}

const Purchase = () => {
    return (
        <div>
            <Link className="td-none goButton" to="/DataBoard">데이터 구매하기</Link>
        </div>
    );
}

class Home extends Component {

    state = {
        menu: 1
    };

    changeMenu = (e) => {
        if (e.target.id === 'auth') {
            this.setState({ menu: 1 });
        }
        else if (e.target.id === 'labeling') {
            this.setState({ menu: 2 });
        }
        else if (e.target.id === 'ai') {
            this.setState({ menu: 3 });
        }
        else if (e.target.id === 'purchase') {
            this.setState({ menu: 4 });
        }
        else {
            alert('메뉴 변경 중 오류가 발생하였습니다.');
        }
    }

    render() {
        return (
            <Fragment>
                <div className="title">
                    <span className="textColorWhite">Class</span>
                    <span className="textColorGold">FIT</span>
                </div>
                <div className="home">
                    <div className="homeFrame">
                        <div className="homeFrameMenu">
                            <ul>
                                <li id="auth" className={this.state.menu === 1 ? "homeFrameMenuClick" : null} onClick={this.changeMenu}>데이터 검증</li>
                                <li id="labeling" className={this.state.menu === 2 ? "homeFrameMenuClick" : null} onClick={this.changeMenu}>데이터 라벨링</li>
                                <li id="ai" className={this.state.menu === 3 ? "homeFrameMenuClick" : null} onClick={this.changeMenu}>AI 모델링</li>
                                <li id="purchase" className={this.state.menu === 4 ? "homeFrameMenuClick" : null} onClick={this.changeMenu}>데이터셋 구매</li>
                            </ul>
                        </div>
                        <div className="homeFrameContent">
                            {this.state.menu === 1 ? <Auth /> : null}
                            {this.state.menu === 2 ? <Labeling /> : null}
                            {this.state.menu === 3 ? <AI /> : null}
                            {this.state.menu === 4 ? <Purchase /> : null}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Home;
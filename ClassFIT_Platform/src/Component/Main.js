import React, { Component, Fragment } from 'react';
import '../App.css';
import lock from '../Image/lock.png';
import Menu from './Menu';

class Main extends Component {

    state = {
        loading: true, //로딩화면 여부
        menu: false //메뉴 렌더링 여부
    };

    componentDidMount() {/*
        setTimeout(() => {
            this.setState({loading: false})
        }, 3000);*/
    }

    toggleMenu = () => {
        this.setState({menu: !this.state.menu});
    }

    render() {
        if (this.state.loading === false) {
            return (
                <div className="loadingBG">
                    <img className="lockImg" src={lock} alt="" />
                    <div className="circle"></div>
                </div>
            );
        }
        else {
            return (
                <Fragment>
                    <div className="closePreventZone"></div>
                    <div className="menuIcon" onClick={this.toggleMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="backFrame">
                        <div className="rights">
                            Copyright 2020. ClassFIT All Rights Reserved.
                        </div>
                    </div>
                    {this.state.menu ? <Menu toggleMenu={this.toggleMenu} /> : null}
                </Fragment>
            );
        }
    }
}

export default Main;
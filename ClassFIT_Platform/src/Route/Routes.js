import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main, LogIn, Home, NotFound, QnA, QnAWrite, QnADisplay, PreProcess, MyPage, Feature,
        AgreeData, AddData, DataBoard, LabelingStart, LabelingRegist, AIStart, AuthResult } from './index';

class Routes extends Component {
    render() {
        return (
            <div>
                <Main />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/Home" component={Home} />
                    <Route path="/LogIn" component={LogIn} />
                    <Route path="/MyPage" component={MyPage} />
                    <Route path="/QnA" component={QnA} />
                    <Route path="/QnADisplay" component={QnADisplay} />
                    <Route path="/QnAWrite" component={QnAWrite} />
                    <Route path="/AgreeData" component={AgreeData} />
                    <Route path="/AddData" component={AddData} />
                    <Route path="/PreProcess" component={PreProcess} />
                    <Route path="/Feature" component={Feature} />
                    <Route path="/DataBoard" component={DataBoard} />
                    <Route path="/LabelingStart" component={LabelingStart} />
                    <Route path="/LabelingRegist" component={LabelingRegist} />
                    <Route path="/AIStart" component={AIStart} />
                    <Route path="/AuthResult" component={AuthResult} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default Routes;

import React, { Component } from 'react';
import '../App.css';


class ProgressMenu extends Component {
    render() {
        if (this.props.origin === 'AI') {
            let firstClass = this.props.level === 1 ? 'active-step editable-step' : 'step-done';
            let secondClass = this.props.level === 2 ? 'active-step editable-step' : '';
            let thirdClass = this.props.level === 3 ? 'active-step editable-step' : '';
            let fourthClass = this.props.level === 4 ? 'active-step editable-step' : '';

            if (this.props.level > 2) {
                secondClass = 'step-done';
            }
            if (this.props.level > 3) {
                thirdClass = 'step-done';
            }

            return (
                <div className="mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__supporting-text">
                        <div className="mdl-stepper-horizontal-alternative">
                            <div className={`mdl-stepper-step ${firstClass}`}>
                                <div className="mdl-stepper-circle"><span>1</span></div>
                                <div className="mdl-stepper-title">Original File</div>
                                <div className="mdl-stepper-bar-left"></div>
                                <div className="mdl-stepper-bar-right"></div>
                            </div>
                            <div className={`mdl-stepper-step ${secondClass}`}>
                                <div className="mdl-stepper-circle"><span>2</span></div>
                                <div className="mdl-stepper-title">PreProcess</div>
                                <div className="mdl-stepper-bar-left"></div>
                                <div className="mdl-stepper-bar-right"></div>
                            </div>
                            <div className={`mdl-stepper-step ${thirdClass}`}>
                                <div className="mdl-stepper-circle"><span>3</span></div>
                                <div className="mdl-stepper-title">Feature</div>
                                <div className="mdl-stepper-bar-left"></div>
                                <div className="mdl-stepper-bar-right"></div>
                            </div>
                            <div className={`mdl-stepper-step ${fourthClass}`}>
                                <div className="mdl-stepper-circle"><span>4</span></div>
                                <div className="mdl-stepper-title">Start</div>
                                <div className="mdl-stepper-bar-left"></div>
                                <div className="mdl-stepper-bar-right"></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.props.origin === 'labeling') {
            let firstClass = this.props.level === 1 ? 'active-step editable-step' : 'step-done';
            let secondClass = this.props.level === 2 ? 'active-step editable-step' : '';

            return (
                <div className="mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__supporting-text">
                        <div className="mdl-stepper-horizontal-alternative">
                            <div className={`mdl-stepper-step ${firstClass}`}>
                                <div className="mdl-stepper-circle"><span>1</span></div>
                                <div className="mdl-stepper-title">Original File</div>
                                <div className="mdl-stepper-bar-left"></div>
                                <div className="mdl-stepper-bar-right"></div>
                            </div>
                            <div className={`mdl-stepper-step ${secondClass}`}>
                                <div className="mdl-stepper-circle"><span>2</span></div>
                                <div className="mdl-stepper-title">Start</div>
                                <div className="mdl-stepper-bar-left"></div>
                                <div className="mdl-stepper-bar-right"></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return null;
        }
    }
}

export default ProgressMenu;
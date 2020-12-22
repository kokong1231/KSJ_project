import React, { Component, Fragment } from 'react';
import '../App.css';

class NotFound extends Component {
    render() {
        return (
            <Fragment>
                <div className="title">
                    <span className="textColorWhite">404 Not Found</span>
                </div>
                <div className="notFound">
                    Sorry...
                </div>
            </Fragment>
        );
    }
}

export default NotFound;
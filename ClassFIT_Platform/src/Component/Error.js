import React, { Component } from 'react';

class Error extends Component {
    state = {
        error: false
    };

    componentDidCatch(error, info) {
        this.setState({error: true});
    }

    render() {
        if (this.state.error) {
            return (
                <h1>잘못된 접근입니다.</h1>
            );
        }
        return this.props.children;
    }
}

export default Error;
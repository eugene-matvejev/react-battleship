import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Game } from '../component';
import { GameModel } from '../model';
import { Link } from 'react-router-dom';

export default class AuthHandler extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onPasswordChange(password) {
        this.setState({ password });
    }

    onUsernameChange(username) {
        this.setState({ username });
    }

    onSuccess() {
        this.setState({color: 'green'});
    }

    onError() {
        this.setState({color: 'red'});
    }

    onSubmit() {
        const { callback } = this.props;
        const { username, password } = this.state;

        callback(
            { username, password },
            ( payload ) => {
                this.onSuccess();
            },
            ( payload ) => {
                this.onError();
            },
        ).then();
    }

    render() {
        const { className, signedUpLink, resetPasswordLink, callback } = this.props;
        const { color } = this.state;

        return <div className={`handler auth ${className}`} style={{background: color}}>
            <h1>Login required</h1>
            <div className="input-wrapper">
                <input type="text" onChange={(e) => this.onUsernameChange(e.target.value)}/>
            </div>
            <div className="input-wrapper">
                <input type="password" onChange={(e) => this.onPasswordChange(e.target.value)}/>
            </div>
            <div>
                <button className="btn-submit" onClick={this.onSubmit}>log in</button>
            </div>
            <Link to={signedUpLink}>sign up</Link>
            <Link to={resetPasswordLink}>forgotten password</Link>
        </div>;
    }


    static propTypes = {
        className: PropTypes.string,
        callback: PropTypes.func.isRequired,
    };

    static defaultProps = {
        className: '',
        signedUpLink: '',
        resetPasswordLink: '',
    };
}

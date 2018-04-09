import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

    onSubmit() {
        const { callback } = this.props;
        const { username, password } = this.state;

        callback({ username, password });
    }

    render() {
        const { className, label, signUpLink, resetPasswordLink } = this.props;

        return <div className={`handler auth ${className}`}>
            <h1>{ label }</h1>
            <div className="input-wrapper">
                <input type="text" onChange={(e) => this.onUsernameChange(e.target.value)}/>
            </div>
            <div className="input-wrapper">
                <input type="password" onChange={(e) => this.onPasswordChange(e.target.value)}/>
            </div>
            <div>
                <button className="btn-submit" onClick={this.onSubmit}>log in</button>
            </div>
            <Link to={signUpLink}>sign up</Link>
            <Link to={resetPasswordLink}>forgotten password</Link>
        </div>;
    }

    static propTypes = {
        callback: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
        signUpLink: PropTypes.string.isRequired,
        resetPasswordLink: PropTypes.string.isRequired,
        className: PropTypes.string,
    };

    static defaultProps = {
        className: '',
    };
}
